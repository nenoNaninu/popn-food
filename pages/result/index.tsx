import { useRef, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { MeshViewer } from '../../components/MeshViewer'
import { createUuid } from '../../components/uuid'
import { ImageTileList, ImageData } from '../../components/ImageTileList'
import { useWindowSize } from '../../components/useWindowSize'
import { useRouter } from 'next/router'
import { fetchImageAndMeshList, ImageAndMesh } from '../../components/request'
import { resourceToUrl } from '../../components/resourceToUrl'

const ResultViewer: NextPage = () => {

    const [imageAndMeshMap, setImageAndMeshMap] = useState<Map<string, ImageAndMesh>>();
    const { height, width } = useWindowSize();
    const router = useRouter();
    const { jsonUrl, key } = router.query;

    const [dishModel, setDishModel] = useState(resourceToUrl('/resource/cube.obj'));
    const [plateModel, setPlateModel] = useState(resourceToUrl('/resource/cube.obj'));

    useEffect(() => {
        const fetch = async () => {
            if (jsonUrl) {
                const data = await fetchImageAndMeshList(jsonUrl as string);

                const dic: Map<string, ImageAndMesh> = new Map<string, ImageAndMesh>();

                for (let i = 0; i < data.length; i++) {
                    dic.set(createUuid(), data[i])
                }

                setImageAndMeshMap(dic);
            }
        }
        fetch();
    }, [jsonUrl])


    const setMeshCallBack = (_: string, guid: string): Promise<void> => {
        if (imageAndMeshMap) {
            const data = imageAndMeshMap.get(guid)

            if (data?.mesh1Url) {
                setDishModel(data.mesh1Url);
            }

            if (data?.mesh2Url) {
                setPlateModel(data.mesh2Url);
            }
        }

        return Promise.resolve();
    };

    const images: ImageData[] = [];

    imageAndMeshMap?.forEach((value, key) => {
        const guid = key;
        const imgSrc = value.imageUrl;

        images.push({ imageSrc: imgSrc, guid: guid });
    })

    return (
        <div className="columns back-color">
            <div className="column p-3">
                <div id="preview">
                    <div className="p-2 mx-6 mt-5">
                        <h1 className='title'>
                            {key}
                        </h1>
                        <ImageTileList images={images} request={setMeshCallBack} ></ImageTileList>
                    </div>
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

export default ResultViewer
