export interface Token {
    type: 'bo' | 'not' | 'term' | 'filter' | 'group';
    from: number;
    to: number;
    term: string;
    predicate?: string;
}
export declare function isToken(o: any): o is Token;
export declare type Parser = (input: string, acc: Token[]) => Token[];
