<template>
    <footer class="bg-primary text-white py-4">
      <div class="container">
        <div class="row">
          <div class="col-6 mb-3 mb-md-0">
            <h2 class="text-uppercase font-weight-bold"><span style="color: #AB533C;">BERITA</span>.com</h2>
            <div class="d-flex justify-content-center justify-content-md-start mb-2">
              <div class="icon bg-light rounded-circle"></div>
              <div class="icon bg-light rounded-circle"></div>
              <div class="icon bg-light rounded-circle"></div>
              <div class="icon bg-light rounded-circle"></div>
            </div>
            <p class="footer-desc mt-5">Berita terkini, <br>terpercaya, terHot sepanjang masa</p>
          </div>
          <div class="col-md-6">
            <h5 class="font-weight-bold">Category</h5>
            <div class="row mt-4">
              <div class="col-4">
                <ul class="list-unstyled">
                    <a href=""><li>Hiburan</li></a>
                    <a href=""><li>Hiburan</li></a>
                    <a href=""><li>Hiburan</li></a>
                </ul>
              </div>
              <div class="col-4">
                <ul class="list-unstyled">
                    <a href=""><li>Hiburan</li></a>
                    <a href=""><li>Hiburan</li></a>
                    <a href=""><li>Hiburan</li></a>
                </ul>
              </div>
              <div class="col-4">
                <ul class="list-unstyled">
                  <a href=""><li>Hiburan</li></a>
                  <a href=""><li>Hiburan</li></a>
                  <a href=""><li>Hiburan</li></a>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <p>Copyright @ 2024 beritakom. All right reserved</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  }
  </script>
  
  <style scoped>
  footer{
    margin-top: 100px;
  }
  .bg-primary {
    background-color: #003d6b !important;
  }
  .text-danger {
    color: #dc3545 !important;
  }
  .bg-light {
    background-color: #f8f9fa !important;
  }
  .icon {
    width: 40px;
    height: 40px;
    margin: 0 5px;
  }

  .footer-desc{
    font-size: 20px;
  }

  .list-unstyled a{
    color: white;
    color: inherit; 
    text-decoration: none;
  }

  .list-unstyled a:hover{
    text-decoration: underline;
  }

  ul.list-unstyled li {
  margin-bottom: 20px; 
}
  </style>

