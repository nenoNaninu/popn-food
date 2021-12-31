import { FC } from 'react';
import Image from 'next/image'

type Props = {
    imageSrc: string;
    guid: string;
    request: (imageSrc: string, guid: string) => Promise<void>;
};

export const ImageTile: FC<Props> = (props) => {

    return (
        <div className="box ">
            <div className='img-container'>
                <img src={props.imageSrc} alt="" />
                <button className="button is-link" onClick={() => props.request(props.imageSrc, props.guid)} >Generate 3D</button>
            </div>
        </div>
    );
}

