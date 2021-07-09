const path = require("path");
const process = require("process");
const fs = require("fs").promises;

const [, , targetDir] = process.argv;
const target = path.join(__dirname, targetDir);

const isCapture = (ext) => {
  if (ext === ".png" || ext === ".aae") return true;
  return false;
};

const isVideo = (ext) => {
  if (ext === ".mp4" || ext === ".mov") return true;
  return false;
};

const isDuplicate = (name) => {
  const isImg = name.includes("IMG_");
  if (isImg === false) return false;

  const [, date] = name.split("_");
  const isEdit = date[0] === "E";
  if (isImg && isEdit) return true;

  return false;
};

const moveToFolder = (basis, fileName, folderName) => {
  const newDirPath = path.join(basis, folderName);
  const beforeFilePath = path.join(basis, fileName);
  const movedFilePath = path.join(newDirPath, fileName);

  fs.mkdir(newDirPath, { recursive: true }) //
    .catch(console.error)
    .then(() => {
      fs.rename(beforeFilePath, movedFilePath).catch(console.error);
    });
};

fs.readdir(target).then((res) => {
  res.forEach((fileName) => {
    const { name, ext } = path.parse(fileName);
    if (isCapture(ext)) {
      console.log();
      moveToFolder(target, fileName, "capture");
      return;
    }
    if (isVideo(ext)) {
      moveToFolder(target, fileName, "video");
      return;
    }
    if (isDuplicate(name)) {
      moveToFolder(target, fileName, "duplicate");
      return;
    }
  });
});
