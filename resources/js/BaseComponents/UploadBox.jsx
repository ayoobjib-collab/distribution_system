import { useState } from 'react';
import { Upload } from 'antd';
import '@/../css/components/upload-box.css';

import { getUrl } from "@/functions/helper";

const UploadBox = ({ name, label, value, setDataInChild }) => {

    console.log((value[0]));
    // console.log(getUrl(value[0]));

    const [fileList, setFileList] = useState(
        Array.isArray(value)
            ? value.map(
                (item, index) => (
                    {
                        uid: `-${index}`,
                        name: `image-${index}`,
                        status: 'done',
                        url: getUrl('storage/' + item),
                    })
            )
            : []
    );

    const onChange = ({ fileList: newFileList }) => {

        setFileList(newFileList);

        const files = newFileList
            .map(file => file.originFileObj)
            .filter(Boolean);//remove false and null data form array

        setDataInChild(name, files);
    };

    const onPreview = async file => {

        let src = file.url;

        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }

        const image = new Image();
        image.src = src;

        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);

    };

    return (
        <div className='upload-box'>

            <span>
                {label}
            </span>

            <Upload
                action=""
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false}
            >
                {fileList.length < 5 && '+ افزودن'}
            </Upload>

        </div>

    );
};

export default UploadBox;