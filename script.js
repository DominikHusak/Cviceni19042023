$(document).ready(function() {
    var likedFacts = localStorage.getItem("likedFacts");
    var dislikedFacts = localStorage.getItem("dislikedFacts");

    if (!likedFacts) {
      likedFacts = [];
    } else {
      likedFacts = JSON.parse(likedFacts);
    }
    if (!dislikedFacts) {
      dislikedFacts = [];
    } else {
      dislikedFacts = JSON.parse(dislikedFacts);
    }

    function saveFactToLocalStorage(fact, type) {
      if (type === "liked") {
        likedFacts.push(fact);
        localStorage.setItem("likedFacts", JSON.stringify(likedFacts));
      } else if (type === "disliked") {
        dislikedFacts.push(fact);
        localStorage.setItem("dislikedFacts", JSON.stringify(dislikedFacts));
      }
    }

    function showFacts(type) {
        var facts;
        if (type === "liked") {
          facts = likedFacts;
        } else if (type === "disliked") {
          facts = dislikedFacts;
        }
        if (facts.length > 0) {
          var randomIndex = Math.floor(Math.random() * facts.length);
          var fact = facts[randomIndex];
          $("#showFactText").text(fact);
        } else {
          $("#showFactText").text("Nemáte žádné fakty označené jako " + type + ".");
        }
      }
      
      $("#showLikedFactsBtn").on("click", function() {
        showFacts("liked");
      });
      
      $("#showDislikedFactsBtn").on("click", function() {
        showFacts("disliked");
      });

    function showRandomFact() {
      $.ajax({
        url: "http://dog-api.kinduff.com/api/facts",
        method: "GET",
        success: function(data) {
          var fact = data.fact; 
          $("#factText").text(fact); 
        },
        error: function() {
          $("#factText").text("Nepodařilo se načíst psí fakt."); 
        }
      });
    }

    $("#loadFactBtn").on("click", function() {
      showRandomFact();
    });

    $("#likeBtn").on("click", function() {
      var fact = $("#factText").text();
      saveFactToLocalStorage(fact, "liked");
      alert("Líbí!");
    });

    $("#dislikeBtn").on("click", function() {
      var fact = $("#factText").text();
      saveFactToLocalStorage(fact, "disliked");
      alert("Nelíbí!");
    });
  });
  