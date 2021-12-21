import { FC, useEffect, useState, useRef } from 'react';
import * as three from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type Props = {
    title: string;
    meshUrl: string;
};

export const MeshViewer: FC<Props> = (props) => {

    const [scene, setScene] = useState<three.Scene | null>(null);
    const [loadedModel, setLoadedModel] = useState<three.Group | null>(null);
    const [displayTitle, setDisplayTitle] = useState("");
    const convasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setDisplayTitle(props.title);
    }, [props.title])

    useEffect(() => {
        const width = window.innerWidth / 2.5;
        const height = window.innerHeight / 2.5;

        if (!convasRef.current) {
            console.log("canvas_elem is null")
            return;
        }

        const renderer = new three.WebGLRenderer({
            canvas: convasRef.current
        });

        renderer.setSize(width, height);

        const scene = new three.Scene();
        scene.overrideMaterial = new three.MeshNormalMaterial();

        const camera = new three.PerspectiveCamera(45, width / height);
        camera.position.set(0, 0, 5);

        const controls = new OrbitControls(camera, convasRef.current);

        console.log(controls.target);
        var loader = new OBJLoader();

        loader.load(props.meshUrl,
            // called when resource is loaded
            object => {
                setLoadedModel(object);
                scene.add(object);
            },
            // called when loading is in progresses
            e => {
                console.log((e.loaded / e.total * 100) + '% loaded');
            },
            // called when loading has errors
            error => {
                console.log('An error happened');
            });

        // event loop
        const tick = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        }

        tick();

        setScene(scene);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [convasRef]);

    useEffect(() => {
        const loader = new OBJLoader();

        if (!scene) {
            return;
        }

        if (loadedModel) {
            scene.remove(loadedModel);
        }

        loader.load(props.meshUrl,
            mesh => {
                setLoadedModel(mesh);
                scene.add(mesh);
            },
            e => {
                console.log((e.loaded / e.total * 100) + '% loaded');
                const message = props.title + " " + String(e.loaded / e.total * 100) + '% loaded';
                setDisplayTitle(message);
            },
            err => {
                console.log("error happen when mesh loading!!!!")
                console.log(err)
            }
        )

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.meshUrl]);

    return (
        <>
            <h1 className="subtitle">{displayTitle}</h1>
            <canvas ref={convasRef}></canvas>
        </>
    );
}

