interface IChildren {
  [key: string]: TrieNode;
}

class TrieNode {
  public isWord: boolean;
  public childrens: IChildren;
  constructor() {
    this.isWord = false;
    this.childrens = {};
  }
}

class Trie {
  private root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  public insertTrie(word: string) {
    let currentNode = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!currentNode.childrens[word[i]]) {
        currentNode.childrens[word[i]] = new TrieNode();
      }
      currentNode = currentNode.childrens[word[i]];
    }
    currentNode.isWord = true;
  }

  public searchTrie(word: string): boolean {
    let currentNode = this.root;
    for (let i = 0; i < word?.length; i++) {
      if (!currentNode.childrens[word[i]]) {
        return false;
      }
      currentNode = currentNode.childrens[word[i]];
    }
    return currentNode.isWord;
  }

  public startWith(startWithChars: string): boolean {
    const currentNode = this.getNode(startWithChars);
    return currentNode != null;
  }

  public stringSuggestion(startWithChars: string): string[] {
    const suggestedString: string[] = [];
    const currentNode = this.getNode(startWithChars);
    if (currentNode != null) {
      this.getSuggenstions(suggestedString, startWithChars, currentNode);
    }
    return suggestedString;
  }

  private getNode(word: string): TrieNode | null {
    let currentNode = this.root;
    for (let i = 0; i < word?.length; i++) {
      if (!currentNode.childrens[word[i]]) {
        return null;
      }
      currentNode = currentNode.childrens[word[i]];
    }
    return currentNode;
  }

  private getSuggenstions(
    suggestion: string[],
    matchingWord: string,
    currentNode: TrieNode
  ) {
    const keys = Object.keys(currentNode.childrens);
    if (currentNode.isWord) {
      suggestion.push(matchingWord);
    }
    if (keys?.length === 0) {
      return;
    }
    for (let i = 0; i < keys.length; i++) {
      this.getSuggenstions(
        suggestion,
        matchingWord + keys[i],
        currentNode.childrens[keys[i]]
      );
    }
  }
}

const triesObj = new Trie();
triesObj.insertTrie('apple');
triesObj.insertTrie('appk');
triesObj.insertTrie('akon');
triesObj.insertTrie('yup');
console.log(triesObj.searchTrie('apple'));
console.log(triesObj.stringSuggestion('a'));
