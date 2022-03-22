import { AddressActivity, Directory } from "../api";
import { ContentHost, SignedCast } from ".";
import GithubGist from "simple-github-gist-api";
import File from "simple-github-gist-api/dist/models/GistFile";
import { AxiosResponse } from "axios";

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
    if (activityFile === null) {
      return;
    }
    const maybeContent = activityFile.fetchLatest();
    let allActivity: SignedCast[];
    if (
      typeof maybeContent === "object" &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (maybeContent as any).data !== undefined
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      allActivity = (maybeContent as any).data;
    } else if (typeof maybeContent === "string") {
      allActivity = JSON.parse(maybeContent);
    } else {
      throw new Error(`invalid gist activity file response`);
    }
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
        return;
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

  async getDirectory(): Promise<Directory | null> {
    await this._ready;
    const file = this._gist.getFile(GithubGistContentHost.DIRECTORY_FILENAME);
    if (file !== null) {
      const directoryAxiosResponse =
        file.fetchLatest() as unknown as AxiosResponse<Directory>;
      return directoryAxiosResponse.data;
    } else {
      return null;
    }
  }

  async bulkUpload(activity: AsyncIterable<AddressActivity>): Promise<void> {
    const activityFile = await this._getOrCreateActivityFile();
    if (activityFile === null) {
      return;
    }
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

  private async _getOrCreateActivityFile(): Promise<File | null> {
    await this._ready;
    if (
      !this._gist
        .getFileNames()
        .includes(GithubGistContentHost.ACTIVITY_FILENAME)
    ) {
      this._gist.createFile(GithubGistContentHost.ACTIVITY_FILENAME, "[]");
    }
    return this._gist.getFile(GithubGistContentHost.ACTIVITY_FILENAME);
  }
}
