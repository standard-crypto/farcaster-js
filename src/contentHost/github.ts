import { AddressActivity, Directory } from "../api";
import { ContentHost, SignedCast } from ".";
import GithubGist from "simple-github-gist-api";
import { AxiosResponse } from "axios";
import GistFile from "simple-github-gist-api/dist/models/GistFile";

export class GithubGistContentHost implements ContentHost {
  private readonly _gist: GithubGist;
  private readonly _ready: Promise<void>;

  static readonly DIRECTORY_FILENAME = "directory.json";
  static readonly ACTIVITY_FILENAME = "activity.json";

  constructor(personalAccessToken: string) {
    this._gist = new GithubGist({
      personalAccessToken,
      appIdentifier: "farcaster-self-hosting",
    });
    this._ready = this._gist.touch();
  }

  async directoryUrl(): Promise<string> {
    await this._ready;
    return (
      `https://gist.githubusercontent.com/${this._gist.ownerUsername}` +
      `/${this._gist.id}/raw/${GithubGistContentHost.DIRECTORY_FILENAME}`
    );
  }

  async activityUrl(): Promise<string> {
    await this._ready;
    return (
      `https://gist.githubusercontent.com/${this._gist.ownerUsername}` +
      `/${this._gist.id}/raw/${GithubGistContentHost.ACTIVITY_FILENAME}`
    );
  }

  async publishCast(cast: SignedCast): Promise<void> {
    const activityFile = await this._getOrCreateActivityFile();
    const allActivity: SignedCast[] = JSON.parse(activityFile.content);
    allActivity.unshift(cast);
    activityFile.overwrite(JSON.stringify(allActivity));
    await activityFile.save();
  }

  async updateDirectory(newDirectory: Directory): Promise<void> {
    await this._ready;
    const directoryJson = JSON.stringify(newDirectory);
    if (
      this._gist
        .getFileNames()
        .includes(GithubGistContentHost.DIRECTORY_FILENAME)
    ) {
      const directory = this._gist.getFile(
        GithubGistContentHost.DIRECTORY_FILENAME
      );
      if (directory === null) {
        throw new Error(
          `Github gist file ${GithubGistContentHost.DIRECTORY_FILENAME} not found`
        );
      }
      directory.overwrite(directoryJson);
      await directory.save();
    } else {
      this._gist.createFile(
        GithubGistContentHost.DIRECTORY_FILENAME,
        directoryJson
      );
      await this._gist.save();
    }
  }

  async getDirectory(): Promise<Directory> {
    await this._ready;
    const directory = this._gist.getFile(
      GithubGistContentHost.DIRECTORY_FILENAME
    );
    if (directory === null) {
      throw new Error(
        `Github gist file ${GithubGistContentHost.DIRECTORY_FILENAME} not found`
      );
    }
    const directoryAxiosResponse =
      directory.content as unknown as AxiosResponse<Directory>;
    return directoryAxiosResponse.data;
  }

  async bulkUpload(activity: AsyncIterable<AddressActivity>): Promise<void> {
    const activityFile = await this._getOrCreateActivityFile();
    const activityList: SignedCast[] = [];
    for await (const a of activity) {
      activityList.push({
        body: a.body,
        signature: a.signature,
        merkleRoot: a.merkleRoot,
      });
    }
    const activityJson = JSON.stringify(activityList);
    activityFile.overwrite(activityJson);
    await activityFile.save();
  }

  private async _getOrCreateActivityFile(): Promise<GistFile> {
    await this._ready;
    if (
      !this._gist
        .getFileNames()
        .includes(GithubGistContentHost.ACTIVITY_FILENAME)
    ) {
      this._gist.createFile(GithubGistContentHost.ACTIVITY_FILENAME, "[]");
    }
    const ret = await this._gist.getFile(
      GithubGistContentHost.ACTIVITY_FILENAME
    );
    if (ret === null) {
      throw new Error(
        `Github gist file ${GithubGistContentHost.ACTIVITY_FILENAME} not found`
      );
    }
    return ret;
  }
}
