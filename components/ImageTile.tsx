import { FC } from 'react';
import Image from 'next/image'

type Props = {
    imageSrc: string;
    guid: string;
    request: (imageBase64: string, guid: string) => Promise<void>;
};

export const ImageTile: FC<Props> = (props) => {

    return (
        <div className="box ">
            <div className='img-container'>
                <Image width='250px' height='250px' src={props.imageSrc} alt="" />
                <button className="button is-link" onClick={() => props.request(props.imageSrc, props.guid)} >Generate 3D</button>
            </div>
        </div>
    );
}

