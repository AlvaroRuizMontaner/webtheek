import api from "@/lib/axios"

export async function generatePDF (html: string)  {
    const url = "/curriculum"
    // Le dice a axios que convierta automaticamente la respuesta en un Blob
    api.defaults.responseType = 'blob';

    const response = await api.post<Blob | MediaSource>(url, {
        htmlContent: html
    },
)
    // Obtener el Blob de la respuesta
    const pdfBlob = response.data;
    // Crear una URL temporal para el Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Abrir el PDF en una nueva pestaña
    return pdfUrl
}