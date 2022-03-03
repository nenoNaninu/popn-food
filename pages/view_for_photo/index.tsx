import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { MeshViewerForPhoto } from '../../components/MeshViewerForPhoto'
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

    const [isNormalView, setNormalView] = useState(false);

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

    const canvasSize = Math.min(width / 2.5, height / 2.5);

    return (
        <div className="columns back-color">
            <div className="column p-3">
                <div id="preview">
                    <div className="p-2 mx-6 mt-5">
                        <h1 className='title'>
                            {key}
                        </h1>
                        <button className={isNormalView ? "button mb-5 is-info" : "button mb-5 is-info is-light"} onClick={() => setNormalView(x => !x)}>Normal View</button>
                        <ImageTileList images={images} request={setMeshCallBack} ></ImageTileList>
                    </div>
                </div>
            </div>

            <div className="column sticky">
                <div className="p-3">
                    <MeshViewerForPhoto title='Dish' meshUrl={dishModel} width={canvasSize} height={canvasSize} pinToNormalView={isNormalView} />
                    <MeshViewerForPhoto title='Plate' meshUrl={plateModel} width={canvasSize} height={canvasSize} pinToNormalView={isNormalView} />
                </div>
            </div>
        </div>
    )
}

export default ResultViewer
