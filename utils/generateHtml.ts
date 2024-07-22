import { MutableRefObject } from "react";

export const getHtmlWithStyles = (htmlElement: MutableRefObject<HTMLDivElement | null>): string | undefined => {
    const element = htmlElement.current;
    if(element) {
        const html = element.innerHTML;
        const styles = Array.from(document.styleSheets)
            .map((styleSheet) => {
                try {
                    return Array.from(styleSheet.cssRules)
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
                    <style>
                   <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

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