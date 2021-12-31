import getConfig from 'next/config'
import { useRouter } from 'next/router'

export function resourceToUrl(basePath: string, filename: string): string {
    return basePath + filename
}
