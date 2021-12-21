export type GenerateMeshResponse = {
    dishUrl: string;
    plateUrl: string;
}

type ResponseJson = {
    dish: string;
    plate: string;
}

export const generateMeshFromImageAsync = async (url: string, imageBase64: string, uuid: string): Promise<GenerateMeshResponse> => {
    const response = await fetch(url, { mode: 'cors', method: "POST", body: JSON.stringify({ guid: uuid, img: imageBase64 }) });
    const json = await response.json();
    const data = json as ResponseJson;
    return { dishUrl: data.dish, plateUrl: data.plate }
}
