---
title: More Sliding Puzzle
description: 從一個送給姪女的玩具開始，把任意圖片做成自己的滑塊拼圖。
hide_title: true
hide_table_of_contents: true
portfolio:
  category: games
  group: independent
  year: 2024
  role: 獨立開發
  featured: true
  order: 0
  cover: /img/works/more-sliding-puzzle.webp
  cover_fit: contain
  gallery:
    - src: /img/works/android-16-9-075-00001080x1920-orig.webp
      alt: More Sliding Puzzle 遊戲與圖像裁切畫面
      id: scene-1
    - src: /img/works/android-16-9-065-00001080x1920-orig.webp
      alt: More Sliding Puzzle 遊戲與圖像裁切畫面
      id: scene-2
  links:
    - label: 網頁版試玩
      url: 'https://farl-lee.itch.io/more-sliding-puzzle'
      id: link-1
    - label: App Store
      url: 'https://apps.apple.com/us/app/more-sliding-puzzle/id6504446737'
      id: link-2
    - label: Google Play
      url: >-
        https://play.google.com/store/apps/details?id=com.prototyper.slidingpuzzle
      id: link-3
---
## 從一個玩具開始 {#從一個玩具開始}

這個小遊戲的靈感來自於送給姪女的一個兒時的玩具，那是一個畫著兔子的 15 Puzzle，僅僅教了她一次她就學會怎麼完成這個拼圖了。後來想要試試看跟她比賽誰完成的速度會比較快，但是又沒辦法複製一份玩具出來；就算有我們也只能透過視訊來玩，要怎麼樣才能夠確實比較誰的速度比較快呢？這就是開始做這個 More Sliding Puzzle 的出發點。



一個能換圖的滑塊拼圖做起來並不是那麼困難，但是不同的圖有可能在不同的尺寸時切割成不同的樣子。我覺得這個挑戰也很有意思，就花了些功夫處理成可以圖可以是任意比例，而且可以讓使用者去調整要使用圖的哪一個部分，這樣一來即使是隨手拍攝的照片，也可以快速做成一個拼圖。



正因為一開始是想要複製原本玩具的感覺，所以就想使用基於物理的算圖方法 (PBR) 來顯示方塊。並且還加上支援光線會隨著機器的傾斜而有所變化，讓他更像是真實的玩具一樣。不過反光的部分雖然很增加質感，卻很容易造成拼圖不容易識別，所以最後的視覺在各種地方都做了一些妥協才能夠達成方便遊玩但是看起來又有點真實感。
