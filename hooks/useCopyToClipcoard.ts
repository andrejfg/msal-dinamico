export function useCopyToClipboard() {
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert(`Texto copiado para a área de transferência:${text}`);
        } catch (error) {
            alert('Falha ao copiar texto');
        }
    };

    return copyToClipboard;
}