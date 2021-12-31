import { FC, useEffect, useState, useRef } from 'react';
import * as three from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export type Props = {
    meshUrl: string;
    title: string;
    width: number;
    height: number;
};

export const MeshViewer: FC<Props> = (props) => {

    const [progres, setProgres] = useState("");
    const [isStarted, setIsStarted] = useState(false);

    const sceneRef = useRef<three.Scene | null>(null);
    const loadedModelRef = useRef<three.Group | null>(null);
    const convasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<three.WebGLRenderer | null>(null);
    const cameraRef = useRef<three.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const isLoopingRef = useRef(false);

    useEffect(() => {
        const width = props.width;
        const height = props.height;

        if (!convasRef.current) {
            console.log("canvas_elem is null")
            return;
        }

        rendererRef.current ??= new three.WebGLRenderer({
            canvas: convasRef.current
        });

        const renderer = rendererRef.current;

        renderer.setSize(width, height);

        sceneRef.current ??= new three.Scene();
        const scene = sceneRef.current;

        scene.overrideMaterial ??= new three.MeshNormalMaterial();

        if (!cameraRef.current) {
            cameraRef.current = new three.PerspectiveCamera(45, width / height);
            cameraRef.current.position.set(0, 0, 5);
        }

        const camera = cameraRef.current;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        controlsRef.current ??= new OrbitControls(camera, convasRef.current);
        controlsRef.current.update();

        if (!isLoopingRef.current) {
            isLoopingRef.current = true;

            // event loop
            const update = () => {
                if (isLoopingRef.current) {
                    renderer.render(scene, camera);
                    requestAnimationFrame(update);
                }
            }

            update();
            setIsStarted(true)
        }

        return () => { isLoopingRef.current = false; }
    }, [props.width, props.height]);

    useEffect(() => {

        if (!isStarted) {
            return;
        }

        if (!sceneRef.current) {
            return;
        }

        const scene = sceneRef.current;
        const loader = new OBJLoader();

        if (loadedModelRef.current) {
            scene.remove(loadedModelRef.current);
            loadedModelRef.current = null;
        }

        loader.load(props.meshUrl,
            mesh => {
                loadedModelRef.current = mesh
                scene.add(mesh);
            },
            e => {
                console.log((e.loaded / e.total * 100) + '% loaded');
                const progresStr = String(e.loaded / e.total * 100) + '% loaded';
                setProgres(progresStr);
            },
            err => {
                console.log("error happen when mesh loading!!!!")
                console.log(err)
            }
        )
    }, [props.meshUrl, isStarted]);

    return (
        <>
            <h1 className="subtitle">{props.title} {progres}</h1>
            <canvas ref={convasRef}></canvas>
        </>
    );
}

