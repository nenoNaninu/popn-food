import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { MeshViewer } from '../components/MeshViewer'
import { fetchResultJsonListAsync, ResponseResultJsonPath } from '../components/request'
import { useWindowSize } from '../components/useWindowSize'
import Link from 'next/link';
import { resourceToUrl } from '../components/resourceToUrl'
import { useRouter } from 'next/router'

const Home: NextPage = () => {

    const { height, width } = useWindowSize();
    const [resultList, setResultList] = useState<ResponseResultJsonPath[]>([])
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            const list = await fetchResultJsonListAsync("resource/resultIndex.json");
            setResultList(list);
        }
        fetch();
    }, [])

    const listView = resultList.map(x => (
        <Link key={x.jsonUrl} href={{ pathname: '/result/', query: { jsonUrl: x.jsonUrl, key: x.key } }} passHref>
            <a className='box'>
                {x.key}
            </a>
        </Link>
    ));

    return (
        <div className="columns back-color">
            <div className="column">
                <div className="p-2 mx-6 mt-5">
                    {listView}
                </div>
            </div>

            <div className="column sticky">
                <div className="p-5">
                    <MeshViewer title='Mesh' meshUrl={resourceToUrl('/resource/cube.obj')} width={width / 2.5} height={height / 2.5}></MeshViewer>
                    <MeshViewer title='Mesh' meshUrl={resourceToUrl('/resource/cube.obj')} width={width / 2.5} height={height / 2.5}></MeshViewer>
                </div>
            </div>
        </div >
    )
}

export default Home
