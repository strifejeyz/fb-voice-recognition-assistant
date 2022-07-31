// Global Variables
let is_searcing = false;

// Only applies to facebook for now.
if (location.href.includes('facebook')) {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const Speech = new window.SpeechRecognition();

    // If false, it will wait until you're done 
    // before it evaluates what you said.
    Speech.interimResults = true;

    Speech.addEventListener('result', (e) => {
        const text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');

        if (e.results[0].isFinal) {

            console.log(text);

            // Refresh page
            if (text.includes("reload the page")) {
                return location.reload();
            }

            // Scroll up and down
            if (text.includes("scroll down")) {
               if (window.scrollY == 0) {
                  window.scroll({
                     top: 200,
                     behavior: 'smooth'
                  });
               }
               else {
                  window.scroll({
                     top: window.scrollY + 200,
                     behavior: 'smooth'
                  });
               }
            }
            if (text.includes("scroll up")) {
                window.scroll({
                   top: window.scrollY - 200,
                   behavior: 'smooth'
                });
            }
            // Scroll down
            if (text.includes("all the way down")) {
                window.scroll({
                   top: 5000,
                   behavior: 'smooth'
                });
            }
            if (text.includes("all the way up")) {
                window.scroll({
                   top: -5000,
                   behavior: 'smooth'
                });
            }

            if (text.includes("bold")) {
                if (confirm("Manood ka ng bold ser?", "YES", "YES")) {
                    window.open("https://www.cornhub.website/");
                }
            }



            // If command has 'go to ...'

            if (text.includes('go to') || text.includes('open')) {
                // Main menus
                const navmenu = document.querySelectorAll("div[role='navigation'] > ul > li");

                if (text.includes("home")) {
                    navmenu[0].querySelector('a').click();
                }
                if (text.includes("videos")) {
                    navmenu[1].querySelector('a').click();
                }
                if (text.includes("marketplace")) {
                    navmenu[2].querySelector('a').click();
                }
                if (text.includes("groups")) {
                    navmenu[3].querySelector('a').click();
                }
                if (text.includes("gaming")) {
                    navmenu[4].querySelector('a').click();
                }
                if (text.includes("profile")) {
                    const profile = document.querySelector("div[data-visualcompletion='ignore-dynamic'] a");
                    profile.click();
                }

                // Stories
                const stories = document.querySelector('a[aria-label="See all stories"]');
                if (text.includes("open stories")) {
                    stories.click();
                }

                const peoples_stories = document.querySelectorAll("div[data-id][title]");
                if (text.includes("open a story")) {
                    peoples_stories[0].firstElementChild.firstElementChild.click();
                }


                // Top Right Menu (Notifications/Messages etc)
                const toprightmenu = document.querySelectorAll("div[aria-label='Account Controls and Settings'] > div");

                if (text.includes("notifications")) {
                   toprightmenu[0].querySelector("div[aria-label='Notifications']").click();
                }
                if (text.includes("messages")) {
                   toprightmenu[1].querySelector("div[aria-label='Messenger']").click();
                }
                if (text.includes("app menu")) {
                   toprightmenu[2].querySelector("div span span div").click();
                }
            }


            // Next and Prev buttons for stories
            const story_btn_controls = document.querySelectorAll("div[style='height: 100%; width: 50%;']")
            if (text.includes("previous story")) {
                story_btn_controls[0].firstElementChild.click();
            }
            if (text.includes("next story")) {
                story_btn_controls[1].firstElementChild.click();
            }




            // If closing all menus
            const toprightmenu = document.querySelectorAll("div[aria-label='Account Controls and Settings'] > div");
            if (text.includes('close')) {
                if (text.includes('notifications')) {
                    toprightmenu[0].querySelector("div[aria-label='Notifications']").click();
                }
                if (text.includes('messages')) {
                    toprightmenu[1].querySelector("div[aria-label='Messenger']").click();
                }
                if (text.includes('app menu')) {
                   toprightmenu[2].querySelector("div span span div").click(); 
                }
            }



            // Search Command
            let fbsearchbox = document.querySelector("input[aria-label='Search Facebook']");
            if (is_searcing) {
                is_searcing = false;

                fbsearchbox.value = text;
                fbsearchbox.dispatchEvent(new KeyboardEvent('keydown', {'key':'Enter'} ));
                
                // Trigger the 'enter' or 'search' action.
                const el = document.createElement('a');
                el.href = `https://web.facebook.com/search/top/?q=${text}&__epa__=SEARCH_BOX&__eps__=comet.home`;
                document.body.appendChild(el)
                el.click();
            }
            else {
                if (text.includes("search")) {
                    is_searcing = true;
                    fbsearchbox.click();
                }
            }

        }
    });

    Speech.addEventListener('end', () => {
        Speech.start();
    });

    Speech.start();
}