import fs from 'fs/promises'

export const leerJSON = async (archivo)=>{
    try {
        const data = await fs.readFile(archivo, 'utf-8');
        return JSON.parse(data)
    } catch (error) {
        return [];
    }
}

export const escribirJSON = async (archivo, data)=>{
    await fs.writeFile(archivo, JSON.stringify(data, null, 2), 'utf-8')
} 