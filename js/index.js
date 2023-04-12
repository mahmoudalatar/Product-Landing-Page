let imgContainer = document.querySelector(".img-container");
let imgContainerP = document.querySelector(".img-container p");
let imgPreviewP = document.querySelector(".preview-img p");
let uploadFile = document.querySelector(".up-down-files .hidden-upload");
let uploadBtn = document.querySelector(".up-down-files .upload");
let downloadBtn = document.querySelector(".up-down-files .download");
let right = document.querySelector(".right");
let left = document.querySelector(".left");
let rightLeft = document.querySelector(".right-left");
let upDown = document.querySelector(".up-down");
let maximize = document.querySelector(".maximize");
let crop = document.querySelector(".crop");

console.log(right);

uploadBtn.addEventListener("click", () => {
  uploadFile.click();
});

uploadFile.addEventListener("change", () => {
  imgContainer.innerHTML = `<img src="" alt="" />`;
  let mainImg = document.querySelector(".img-container img");

  var file = uploadFile.files[0];
  var url = window.URL.createObjectURL(new Blob([file], { type: `image/jpg` }));
  mainImg.src = url;
  imgContainerP.style.display = "none";
  imgPreviewP.style.display = "none";

  var options = {
    dragMode: "move",
    preview: ".preview-img-container",
    viewMode: 2,
    modal: false,
    background: false,
    ready: function () {
      // rotate image
      right.onclick = () => cropper.rotate(45);
      left.onclick = () => cropper.rotate(-45);

      // flip image
      var flipX = -1;
      var flipY = -1;
      rightLeft.onclick = () => {
        cropper.scale(flipX, 1);
        flipX = -flipX;
      };
      upDown.onclick = () => {
        cropper.scale(1, flipY);
        flipY = -flipY;
      };

      // drag mode
      crop.onclick = () => cropper.setDragMode("crop");
      maximize.onclick = () => cropper.setDragMode("move");

      // download cropped image
      downloadBtn.onclick = () => {
        downloadBtn.innerText = "...";
        cropper.getCroppedCanvas().toBlob((blob) => {
          var downloadUrl = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = downloadUrl;
          a.download = "cropped-image.jpg"; // output image name
          a.click();
          downloadBtn.innerText = "Download";
        });
      };
    },
  };
  var cropper = new Cropper(mainImg, options);
});
