$.fn.simpleScroll = function(options) {

  var defaults = {
    'width': '100wh',
    'height': '0vh'
  };

  var settings = $.extend( {}, defaults, options );

  return this.each(function() {
    var $this = $(this);

    // Adiciona o estilo
    $this.css({
      width: settings.width,
      height: settings.height,
      display: "block"
    });

    //Adiciona a classe para fazer o scroll
    $this.addClass('simple-scroll-container');

    //Adiciona as div's internas para englobar o conteúdo
    var $html = $this.html();
    $this.html('').append('<div class="simple-scroll-content"><div></div> </div>');
    $this.find(".simple-scroll-content").find("div").html($html);

    //Adiciona as div's da barra lateral
    $this.prepend('<div class="simple-scroll-back"> <div class="simple-scroll-bar"></div> </div>');
    
    //Tamanho VISIVEL
    var tamanhoJanelaX = $this.width();
    var tamanhoJanelaY = $this.height();

    //Tamanho CONTEUDO
    var tamanhoConteudoX = $this.find(".simple-scroll-content").children().width();
    var tamanhoConteudoY = $this.find(".simple-scroll-content").children().height();

    //Tamanho SCROLL
    var tamanhoScrolBack = $this.find(".simple-scroll-back").height();
    var tamanhoScrollBar = (tamanhoScrolBack * tamanhoJanelaY) / tamanhoConteudoY;

    //Verifica se tem scroll
    if (tamanhoScrolBack > tamanhoScrollBar) {
      $this.find(".simple-scroll-bar").height(tamanhoScrollBar);
    }
    else{
      $('.simple-scroll-back').hide();
    }

    //Evento scroll conteudo
    $this.find(".simple-scroll-content").scroll(function(){
      var x = $(".simple-scroll-content").scrollTop();

      var tamanhoTop = (tamanhoScrollBar * x) / (tamanhoJanelaY + 10);

      if ((tamanhoTop + tamanhoScrollBar) > tamanhoJanelaY) {
        tamanhoTop = tamanhoJanelaY - tamanhoScrollBar;
      }
      
      $this.find(".simple-scroll-bar").css({
        top: tamanhoTop
      });
    });

  });
}; 