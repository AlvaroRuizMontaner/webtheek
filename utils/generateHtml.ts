import { MutableRefObject } from "react";

export const getHtmlWithStyles = (htmlElement: MutableRefObject<HTMLDivElement | null>): string | undefined => {
    const element = htmlElement.current;
    if(element) {
        const html = element.innerHTML;
        const styles = Array.from(document.styleSheets) // Convierte el array-like object en array
            .map((styleSheet) => {
                try {
                    return Array.from(styleSheet.cssRules)
                    .filter((rule) => {
                        // Filtra reglas @font-face y clases específicas
                        const cssText = rule.cssText;
                        const isFontFace = cssText.includes('@font-face');
                        const isSpecificClass = cssText.includes('.__className_fdcb09');
                        return !isFontFace && !isSpecificClass;
                    })
                        .map((rule) => rule.cssText)
                        .join('');
                } catch (error) {
                    console.error('Error accessing stylesheet:', error);
                    return '';
                }
            })
            .join('');
    
        return `
            <html>
                <head>
                    <meta charset="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap');
                        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;700;900&display=swap');
                            body {
                                font-family: Poppins;
                            }
                        ${styles}
                    </style>
                </head>
                <body>
                    ${html}
                </body>
            </html>
        `
    }else {
        console.error("No se ha podido generar el html")
    }
};