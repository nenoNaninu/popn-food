import { useRef, useState } from 'react'
import type { NextPage } from 'next'
import { MeshViewer } from '../../components/MeshViewer'
import { createUuid } from '../../components/uuid'
import { Base64ImageTileList, ImageData } from '../../components/Base64ImageTileList'
import { generateMeshFromImageAsync } from '../../components/request'
import { useWindowSize } from '../../components/useWindowSize'
import { resourceToUrl } from '../../components/resourceToUrl'

const RealtimeViewer: NextPage = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<ImageData[]>([]);
    const { height, width } = useWindowSize();

    const [dishModel, setDishModel] = useState(resourceToUrl('/resource/cube.obj'));
    const [plateModel, setPlateModel] = useState(resourceToUrl('/resource/cube.obj'));

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
        <div className="columns back-color">
            <div className="column m-5">
                <div>
                    <label className="button is-link m-2">
                        Select Image
                        <input className="dn" type="file" ref={inputRef} accept=".png, .jpg, .jpeg" onChange={() => readImageCallBack()} />
                    </label>
                </div>

                <div id="preview">
                    <Base64ImageTileList images={images} request={requestGenerateMeshCallBack} ></Base64ImageTileList>
                </div>
            </div>

            <div className="column sticky">
                <div className="p-3">
                    <MeshViewer title='Dish' meshUrl={dishModel} width={width / 2.5} height={height / 2.5}></MeshViewer>
                    <MeshViewer title='Plate' meshUrl={plateModel} width={width / 2.5} height={height / 2.5}></MeshViewer>
                </div>
            </div>
        </div>
    )
}

export default RealtimeViewer
