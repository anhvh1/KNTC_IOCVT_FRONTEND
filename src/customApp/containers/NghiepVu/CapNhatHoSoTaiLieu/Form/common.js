const handleRenderFileDinhKem = (data) => {
  if (data) {
    return data.map((item) => {
      return (
        <p>
          <a href={item.UrlFile} target="_blank">
            {item.TenFile || item.TenFileGoc}
          </a>
        </p>
      );
    });
  }
};

export { handleRenderFileDinhKem };
