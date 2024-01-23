# kata-numbers-to-french-llm

## Description

Just for the fun of it let's use Langchain to do the heavy lifting for us.
  

### How to use
1. Install to local machine `git clone git@github.com:Eugene-Mokrushin/kata-numbers-to-french-llm.git`
2. Create `.env` file in the root and add your own `OPENAI_API_KEY=secret`
3. Run server with `npm run start:dev`
4. Make `POST` request to `http://localhost:2001/numbers/translate` with body (for example):

```json
{
	"number": [0, 1, 5, 10, 11, 91],
	"language": "bg",
	"model": "gpt-4"
}
```
5. Output:
```json
{
	"data": [
		"zéro",
		"un",
		"cinq",
		"dix",
		"onze",
		"nonante-et-un"
	]
}
```
