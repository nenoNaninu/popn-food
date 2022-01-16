import router from 'next/router'

export function resourceToUrl(filename: string): string {
    return process.browser ? router.basePath + filename : filename;
}
