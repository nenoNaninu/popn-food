import { FC } from 'react';
import { ImageTile } from './ImageTile'

export type ImageData = {
    imageSrc: string,
    guid: string;
};

type Props = {
    images: ImageData[];
    request: (imageSrc: string, guid: string) => Promise<void>;
}

export const ImageTileList: FC<Props> = (props) => {

    const list = props.images.map(x =>
    (
        <ImageTile key={x.guid} imageSrc={x.imageSrc} guid={x.guid} request={props.request} />
    ));

    return (
        <>
            {list}
        </>
    )
}

