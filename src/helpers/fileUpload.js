/* eslint-disable no-unused-vars */

export const fileUpload = async (file) => {

    // if (!file) throw new Error('Missing file');
    if (!file) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/djjtcdrog/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error ('Errow while uploading file');
        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }

}