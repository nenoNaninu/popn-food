import { FC } from 'react';
import { ImageTile } from '../components/ImageTile'

export type ImageData = {
    imageBase64: string,
    guid: string;
};

type Props = {
    images: ImageData[];
    request: (imageBase64: string, guid: string) => Promise<void>;
}

export const ImageTileList: FC<Props> = (props) => {

    const list = props.images.map(x =>
    (
        <ImageTile key={x.guid} imageSrc={x.imageBase64} guid={x.guid} request={props.request} />
    ));

    return (
        <>
            {list}
        </>
    )

}
