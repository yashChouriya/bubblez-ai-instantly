import nltk
from nltk.corpus import wordnet

# nltk.download("punkt")
# nltk.download("wordnet")


def rephrase_paragraph(paragraph):
    sentences = nltk.sent_tokenize(paragraph)  # Tokenize the paragraph into sentences
    rephrased_sentences = []

    for sentence in sentences:
        words = nltk.word_tokenize(sentence)  # Tokenize each sentence into words
        rephrased_words = []

        for word in words:
            synsets = wordnet.synsets(word)  # Get the synsets (synonyms) of the word

            if synsets:
                synonyms = synsets[
                    0
                ].lemmas()  # Get the first lemma (synonym) of the first synset
                synonym = (
                    synonyms[0].name() if synonyms else word
                )  # Use the synonym if available, else use the word
                rephrased_words.append(synonym)
            else:
                rephrased_words.append(word)

        rephrased_sentence = " ".join(rephrased_words)
        rephrased_sentences.append(rephrased_sentence)

    rephrased_paragraph = " ".join(rephrased_sentences)
    return rephrased_paragraph
