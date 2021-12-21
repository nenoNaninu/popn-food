import { useRef, useState } from 'react'
import type { NextPage } from 'next'
import { MeshViewer } from '../components/MeshViewer'
import { createUuid } from '../components/uuid'
import { ImageTileList, ImageData } from '../components/ImageTileList'
import { generateMeshFromImageAsync } from '../components/request'

const Home: NextPage = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<ImageData[]>([]);

    const [dishModel, setDishModel] = useState('resource/cube.obj');
    const [plateModel, setPlateModel] = useState('resource/cube.obj');

    const readImageCallBack = () => {
        console.log("call callback!!!!!!!!!!!!!!!");

        if (!inputRef.current || !inputRef.current.files) {
            console.log("inputRef.current is null or inputRef.current.files is null");
            return;
        }

        const files = inputRef.current.files;

        for (var i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = e => {
                const base64ImageUrl = e.target!.result as string; // base64 url
                const guid = createUuid();

                const data: ImageData = { imageBase64: base64ImageUrl, guid: guid };

                setImages(imageArray => [data, ...imageArray]);
            }

            // The file will be base64 encoded.
            reader.readAsDataURL(files[i]);
        }
    };

    const requestGenerateMeshCallBack = async (imageBase64: string, guid: string): Promise<void> => {
        const response = await generateMeshFromImageAsync('http://localhost:8888/generate', imageBase64, guid);
        console.log(response)
        setDishModel(response.dishUrl);
        setPlateModel(response.plateUrl);
    };

    return (
        <>
            <div className="columns back-color" id="app">
                <div className="column p3">
                    <div className="p2">
                        <label className="button is-link mr2">
                            Select Image
                            <input className="dn" type="file" ref={inputRef} accept=".png, .jpg, .jpeg" onChange={() => readImageCallBack()} />
                        </label>
                    </div>

                    <div id="preview">
                        <ImageTileList images={images} request={requestGenerateMeshCallBack} ></ImageTileList>
                    </div>
                </div>

                <div className="column sticky">
                    <div className="p3">
                        <MeshViewer title='dish' meshUrl={dishModel}></MeshViewer>
                        <MeshViewer title='plate' meshUrl={plateModel}></MeshViewer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
