import path from "path";
import slugify from "slugify";
import fs from "fs/promises";
import childProcess from "child_process";
import { promisify } from "util";
import prompts from "prompts";

const exec = promisify(childProcess.exec);

const rootPath = path.join(__dirname, "..");
const yarnLockPath = path.join(rootPath, "yarn.lock");
const releaseRcPath = path.join(rootPath, ".releaserc.json");
const cspellPath = path.join(rootPath, ".cspell.json");
const packageJsonPath = path.join(rootPath, "package.json");
const setupPath = __filename;
const workflowPath = path.join(
  rootPath,
  ".github/workflows/typescript-library-starter.yml"
);
const codeOfConductPath = path.join(rootPath, "CODE_OF_CONDUCT.md");

interface Input {
  packageName: string;
  githubUserName: string;
  userMail: string;
  packageManager: "yarn" | "npm";
}

async function main() {
  const initialProjectName = path.basename(rootPath);

  const { packageName, githubUserName, userMail, packageManager }: Input =
    await prompts([
      {
        type: "text",
        name: "packageName",
        message: "What is your project name?",
        initial: initialProjectName,
      },
      {
        type: "text",
        name: "githubUserName",
        message: "What is your github username (package.json)?",
      },
      {
        type: "text",
        name: "userMail",
        message: "What is your mail (CODE_OF_CONDUCT.md)?",
      },
      {
        type: "select",
        name: "packageManager",
        message: "Pick a package manager",
        choices: [
          { title: "Yarn v1", value: "yarn" },
          { title: "npm", value: "npm" },
        ],
      },
    ]);

  if (!packageManager || !packageName || !githubUserName) {
    console.log("User input missing. Exiting");
    process.exit(1);
  }

  await applyPackageName({ packageName, githubUserName, userMail });

  if (packageManager === "npm") {
    await switchToNpm();
  }

  await cleanup({ packageName });

  console.log("Ready to go 🚀");
}

async function switchToNpm() {
  await logAsyncTask(
    "Running `npm install`",
    exec("npm install", {
      cwd: rootPath,
    })
  );

  await logAsyncTask("Removing yarn.lock", fs.rm(yarnLockPath));
}

async function applyPackageName({
  packageName,
  githubUserName,
  userMail,
}: {
  packageName: string;
  githubUserName: string;
  userMail: string;
}) {
  const packageSlug = slugify(packageName);

  await logAsyncTask(
    "Changing GitHub workflow file",
    replaceInFile(
      workflowPath,
      new Map([
        ["Typescript Library Starter", packageName],
        ["typescript-library-starter", packageSlug],
      ])
    )
  );

  await logAsyncTask(
    "Renaming GitHub workflow file",
    fs.rename(
      workflowPath,
      path.join(rootPath, `.github/workflows/${packageName}.yml`)
    )
  );

  await logAsyncTask(
    "Editing .releaserc.json",
    replaceInFile(
      releaseRcPath,
      new Map([
        [
          "gjuchault/typescript-library-starter",
          `${githubUserName}/${packageName}`,
        ],
      ])
    )
  );

  await logAsyncTask(
    "Editing CODE_OF_CONDUCT.md",
    replaceInFile(
      codeOfConductPath,
      new Map([["gabriel.juchault@gmail.com", userMail]])
    )
  );

  await logAsyncTask(
    "Editing package.json",

    replaceInFile(
      packageJsonPath,
      new Map<string | RegExp, string>([
        ["@gjuchault/typescript-library-starter", packageName],
        [/[^\n]+"description[^\n]+\n/, ""],
        [/[^\n]+"keywords[^\]]+\],\n/, ""],
        [/[^\n]+"homepage[^\n]+\n/, ""],
        [/[^\n]+"bugs[^\n]+\n/, ""],
        [/[^\n]+"author[^\n]+\n/, ""],
        [/[^\n]+"repository[^\n]+\n/, ""],
        [/[^\n]+"setup[^\n]+\n/, ""],
      ])
    )
  );
}

async function cleanup({ packageName }: { packageName: string }) {
  await logAsyncTask(
    "Removing dependencies",
    exec("yarn remove slugify prompts")
  );

  await logAsyncTask(
    "Cleaning cspell",
    replaceInFile(cspellPath, new Map([["gjuchault", packageName]]))
  );

  await logAsyncTask("Removing setup.ts script", fs.rm(setupPath));
}

async function replaceInFile(
  filePath: string,
  replacers: Map<string | RegExp, string>
) {
  const fileContent = await fs.readFile(filePath, "utf8");

  let replacedContent = fileContent;
  for (const [searchFor, replaceBy] of replacers) {
    replacedContent = replacedContent.replace(searchFor, replaceBy);
  }

  await fs.writeFile(filePath, replacedContent);
}

async function logAsyncTask<TResolve>(
  message: string,
  promise: Promise<TResolve>
) {
  process.stdout.write(message);

  const output = await promise;

  console.log(" ✅");

  return output;
}

if (require.main === module) {
  main();
}
