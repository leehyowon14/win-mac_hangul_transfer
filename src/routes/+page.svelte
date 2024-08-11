<script>
    import { onMount } from 'svelte';
  
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
  
    onMount(() => {
      fileInput = document.getElementById('fileInput');
    });
</script>

<h1>맥-윈도우 한글 오류 수정</h1>
<input type="file" id="fileInput"/>
<button on:click={handleDownload}>다운로드</button>
