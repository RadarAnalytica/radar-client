import { URL } from "./config";
export const getFileClickHandler = async (token, shopId) => {
  console.log("getFileClickHandler called");
  const res = await fetch(`${URL}/api/shop/cost/${shopId}`, {
    method: "GET",
    headers: {
      authorization: "JWT " + token,
    },
  });
  if (res.status === 200) {
    const blob = await res.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Себестоимость.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.log("error");
  }
};

export const saveFileClickHandler = async (file, token, shopId) => {
  const modifiedFile = file;
  const newFile = new File([modifiedFile], "modified_file.xlsx", {
    type: modifiedFile.type,
  });
  const formData = new FormData();
  formData.append("file", newFile);

  const res = await fetch(`${URL}/api/shop/cost/${shopId}`, {
    method: "POST",
    headers: {
      authorization: "JWT " + token,
    },
    body: formData,
  });
  if (res.status === 200) {
    console.log("success Post");
  } else {
    console.log("error Post");
  }
};
