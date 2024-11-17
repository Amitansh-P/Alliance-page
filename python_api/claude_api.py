import sys
import json
import anthropic
import os
API_KEY = os.getenv("ANTHROPIC_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Please set the ANTHROPIC_API_KEY environment variable.")

def main():
    input_data = json.loads(sys.argv[1])

    client = anthropic.Anthropic(api_key=API_KEY)

    # Call Claude Sonnet API
    try:
        prompt = input_data.get("prompt", "Provide suggestions based on the input")
        response = client.completions.create(
            model="claude-3.5",
            prompt=prompt,
            max_tokens_to_sample=500
        )
        # Print the response as JSON (Node.js will capture this output)
        print(json.dumps({"suggestion": response["completion"]}))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)

if __name__ == "__main__":
    main()
