export type GenerateMeshResponse = {
    dishUrl: string;
    plateUrl: string;
}

type ResponseMeshData = {
    dish: string;
    plate: string;
}

export const generateMeshFromImageAsync = async (url: string, imageBase64: string, uuid: string): Promise<GenerateMeshResponse> => {
    const response = await fetch(url, { mode: 'cors', method: "POST", body: JSON.stringify({ guid: uuid, img: imageBase64 }) });
    const json = await response.json();
    const data = json as ResponseMeshData;
    return { dishUrl: data.dish, plateUrl: data.plate }
}

export type ResponseResultJsonPath = {
    key: string;
    jsonUrl: string;
}


export const fetchResultJsonListAsync = async (url: string): Promise<ResponseResultJsonPath[]> => {
    const response = await fetch(url, { mode: 'cors', method: "GET" });
    const json = await response.json();
    const data = json as ResponseResultJsonPath[];
    return data;
}

export type ImageAndMesh = {
    imageUrl: string;
    mesh1Url: string;
    mesh2Url?: string;
}

export const fetchImageAndMeshList = async (url: string): Promise<ImageAndMesh[]> => {
    const response = await fetch(url, { mode: 'cors', method: "GET" });
    const json = await response.json();
    const data = json as ImageAndMesh[];
    return data;
}
