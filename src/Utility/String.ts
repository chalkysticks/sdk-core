/**
 * @author Matt Kenefick<matt@chalkysticks.com>
 * @class String
 * @package Utility
 * @project ChalkySticks SDK Core
 */
export class String {
    /**
     * @param string str
     * @return string
     */
    public capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Break paragraph into chunks of sentences at least 50 characters or more
     *
     * @param string paragraph
     * @param number chunkSize
     * @return string[]
     */
    public chunkSentences(paragraph: string, chunkSize: number = 130): string[] {
        const sentences: string[] = paragraph.replace(/\.$/, '').split('. ');
        const chunks: string[] = [];

        sentences.forEach((sentence: string) => {
            if (chunks.length === 0 || chunks[chunks.length - 1].length > chunkSize) {
                chunks.push(sentence + '.');
            } else {
                sentence = sentence.trim();

                chunks[chunks.length - 1] += ` ${sentence}.`;
            }
        });

        return chunks;
    }

    /**
     * @param string str
     * @param number length
     * @return string
     */
    public truncate(str: string, length: number = 30): string {
        return str.length > length ? str.slice(0, length).trim() + '...' : str;
    }

    /**
     * @param string paragraph
     * @param number targetCharacters
     * @return string
     */
    public trimSentences(paragraph: string, targetCharacters: number = 500): string {
        const periodIndex = paragraph.indexOf('.', targetCharacters);
        return paragraph.substr(0, periodIndex > 0 ? periodIndex + 1 : paragraph.length);
    }
}

export default new String();
