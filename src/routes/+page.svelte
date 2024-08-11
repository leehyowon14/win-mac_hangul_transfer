<svelte:head>
	<title>맥-윈도우 파일 이름 변환기</title>
    
    <style>
        body {
            margin: 0px;
            height: 100%;
            width: 100%;
            overflow: hidden;
            font-family: 'Noto Sans KR', sans-serif;
            align-items: center;
            justify-content: center;
            color: #555;
            background-color: #ecf0f3;
            overflow-y: scroll;
        }

        h1 {
            text-align: center;
            color: #000000;
        }

        .description {
            text-align: center;
        }
        
        .file-input-wrapper {
            text-align: center;
            margin: 20px auto;
            border: 2px dashed #ccc;
            padding: 20px;
            border-radius: 10px;
            width: 80%;
        }

        input[type="file"] {
            display: none;
        }

        .file-label {
            display: inline-block;
            padding: 50px;
            font-size: 18px;
            color: #666;
            border: none;
            outline: none;
            transition: box-shadow 0.3s ease-in-out;
            cursor: pointer;
        }

        .file-name {
            text-align: center;
            font-size: 18px;
            color: #333;
            margin-top: 20px;
        }

        button {
            outline: none;
            border: none;
            cursor: pointer;
            width: 50%;
            height:60px;
            border-radius: 30px;
            font-size:20px;
            font-family: 'Noto Sans KR', sans-serif;
            color: #fff;
            text-align: center;
            background-color: #7B42FF;
            box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #fff;
            transition: all 0.5s;
            margin: 0 auto;
            display: block;
            margin-top: 20px;
        }

        button:hover {
            background-color: #3e2180;
        }

        button:active {
            background-color: #1f1140;
        }
    </style>

    <script>
        import { onMount } from 'svelte';
        let fileName = '';
    
        function handleDownload() {
        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name.normalize("NFC");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        }
    
        function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            fileName = file.name;
        }
        }
    
        function handleDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            fileName = file.name;
            fileInput.files = event.dataTransfer.files;
            fileInput.dispatchEvent(new Event('change'));
        }
        }
    
        function handleDragOver(event) {
        event.preventDefault();
        }
    
        onMount(() => {
        fileInput = document.getElementById('fileInput');
        const dropArea = document.querySelector('.file-input-wrapper');
        dropArea.addEventListener('drop', handleDrop);
        dropArea.addEventListener('dragover', handleDragOver);
        fileInput.addEventListener('change', handleFileChange);
        });
    </script>
</svelte:head>

<h1>맥-윈도우 파일 이름 깨짐 수정</h1>
<div class="description">
    <p>맥에서 윈도우로 파일을 이동하면 파일 이름이 깨집니다. 이 프로그램은 파일 이름을 수정해줍니다.<br>
    <b>맥에서 해당 사이트를 이용 시, 동일한 현상이 발생합니다. 반드시 윈도우 환경에서 사용해주세요.</b></p>
</div>
<div class="file-input-wrapper">
    <label for="fileInput" class="file-label">여기를 클릭하여 파일을 선택하시거나<br>
    여기로 파일을 드래그 앤 드롭 해주세요.</label>
    <input type="file" id="fileInput"/>
    {#if fileName}
        <div class="file-name">{fileName}</div>
    {/if}
</div>
<button on:click={handleDownload}>다운로드</button>