import { useState, memo } from 'react';
import { Upload } from 'antd';
import '@/../css/components/upload-box.css';
import { getUrl } from "@/functions/helper";

const UploadBox = memo(({ name, label, value, error, setDataInChild }) => {
    
    const [fileList, setFileList] = useState(
        Array.isArray(value)
            ? value.map((item, index) => (
                {
                    uid: `-${index}`,
                    name: `image-${index}`,
                    status: 'done',
                    urlInDb: item,
                    url: getUrl('storage/' + item),
                })
            )
            : []
    );

    const onChange = ({ fileList: newFileList }) => {

        setFileList(newFileList);

        /**
         * Old images has urlInDb but new file image don't have urlInDb
         */
        const oldImages = newFileList
            .filter(file => file.urlInDb)
            .map(file => {
                return file.urlInDb;
            });

        const newImages = newFileList
            .filter(file => file.originFileObj)
            .map(file => file.originFileObj);

        /**
        * Old Image save old urls and image save new files
        */
        setDataInChild('old_image', oldImages);
        setDataInChild(name, newImages);
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
            {error && <div className="errors">{error}</div>}

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
});

export default UploadBox;