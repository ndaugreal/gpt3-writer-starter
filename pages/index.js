import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
// import { generateContent } from './api/generate';
// import generateContent from './api/generate';

const Home = () => {

  const [prompt, setPrompt] = useState(''); // state variable to store the text in the text box
  const handlePromptChange = (e) => { // function to handle the change in the text box
    // console.log(e.target.value)
    setPrompt(e.target.value); // set the state variable to the value of the text box
  };


  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  //  const [content, setContent] = useState(''); // state variable to store the generated summary

  const handleClick = async () => {
    setIsGenerating(true);

    // console.log("Calling OpenAI... using prompt:", prompt)

    // const generatedContent = await generateContent(prompt);
    // setContent(generatedContent);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    // console.log("response is: ", response);

    const data = await response.json();
    // console.log("data is: ", data);

    const { output } = data;
    //    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }


  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Magic Image Prompt Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Input a topic you are interested in and we will generate a magic prompt for AI image generation (use it for Stable Diffusion, Mid-Journey, Dalle or whatever you like!) !</h2>
          </div>
        </div>
      </div>
      {/* Insert a text box named prompt-container for users to input their text */}
      <div className="prompt-container">
        <textarea
          placeholder="Start typing your prompt here" // placeholder text
          className='prompt-box'
          value={prompt} // value of the text box
          onChange={handlePromptChange} // function to handle the change in the text box
        ></textarea>
      </div>
      {/* Insert a button named generate-button so users can click to submit text
      <div className="button-container">
        <button className="generate-button" onClick={handleClick} disabled={isGenerating}>
          {isGenerating ? 'Loading...' : 'Generate'} 
          <div className='generate'>
            <p>Generate</p>
          </div> 
        </button> 
      </div> */}
      <div className="prompt-buttons">
        <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={handleClick}>
          <div className='generate'>
            {isGenerating ? <span className="loader"></span> : <p>'Generate'</p>}
          </div>
        </a>
      </div>
      {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;

  // const [content, setContent] = useState(''); // state variable to store the generated summary
  // const handleClick = async () => { // function to handle the click of the button
  //   console.log("calling openAI to generate content");
  //   const generatedContent = await generateContent(prompt);
  //   setContent(generatedContent);
  //   console.log("responses are", generatedContent); // print the value of the text box to the console
  // };