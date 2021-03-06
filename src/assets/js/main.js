document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  const main = document.querySelector("main");
  const content = document.querySelector(".content");
  const wrapper = document.querySelector(".content > .wrapper");
  const scrollToTop = document.createElement("div");
  scrollToTop.classList.add("scroll-to-top");
  wrapper.appendChild(scrollToTop);

  let lastScrollTop = 0;

  wrapper.addEventListener("scroll", () => {
    let currentScrollTop = wrapper.scrollTop;

    if (currentScrollTop > 50) {
      if (currentScrollTop > lastScrollTop) {
        //Scroll down
        scrollToTop.classList.remove("is-active");
      } else {
        //Scroll up
        scrollToTop.classList.add("is-active");
      }

      lastScrollTop = currentScrollTop;
    } else {
      scrollToTop.classList.remove("is-active");
    }
  });

  scrollToTop.addEventListener("click", () => {
    wrapper.scrollTo({top: 0, behavior: "smooth"});
    content.scrollTo({top: 0, behavior: "smooth"});
  });

  /* =====================================================
       Progress Bar
  ===================================================== */
  const progress = document.querySelectorAll("progress");
  if (progress[0]) {
    progress.forEach(bar => {
      const max = bar.getAttribute("max");
      const time = (1000 / max) * 5;
      const value = bar.value;

      const loading = () => {
        value += 1;
        const addValue = bar.value(value);
        bar.querySelector(".progress-value").innerHTML(`${value}%`);

        if (value === max) {
          clearInterval(animate);
        }

        const animate = () => {
          setInterval(() => {
            loading();
          }, time);
        };

        animate();
      };
    });
  }

  /* =====================================================
       Tooltip
  ===================================================== */
  // const tooltips = document.querySelectorAll(".tooltip-icon");
  // if (tooltips) {
  //   tooltips.forEach((tooltip) => {
  //     tooltip.addEventListener("click", (event) => {
  //       const content = event.target.nextElementSibling;
  //       content.classList.toggle("is-active");
  //     });
  //   });
  // }
  const tooltips = document.querySelectorAll("[data-tooltip]");
  if (tooltips[0]) {
    tooltips.forEach(tooltip => {
      tooltip.addEventListener("mouseover", event => {
        event.preventDefault();
        event.stopPropagation();
        event.target.parentElement.style.zIndex = "5";
      });
    });
  }

  /* =====================================================
       Target Smooth Scroll
  ===================================================== */
  // ?????? ????????? ?????????: ?????? ????????? ?????? ?????????
  const anchors = document.querySelectorAll("a[href^='#']");
  if (anchors[0]) {
    anchors.forEach(anchor => {
      anchor.addEventListener("click", () => {
        anchor.getAttribute("href").scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  /* =====================================================
       Input Search Clear Button
  ===================================================== */
  // ???????????? "x"?????? ????????? clear value
  const inputs = document.querySelectorAll(".input input");
  inputs.forEach(input => {
    input.addEventListener("keyup", event => {
      const {target} = event;
      const container = target.closest(".input");
      const clear = container.querySelector(".x");
      clear.classList.add("is-active");

      clear.addEventListener("click", () => {
        clear.classList.remove("is-active");
        input.value = "";
      });
    });
  });

  /* =====================================================
       Layout: ?????????????????? ????????? ???????????? ????????????
  ===================================================== */
  const layout = document.querySelectorAll(".layout");
  layout.forEach(layout => {
    const listType = layout.querySelector(".type-list");
    const list = layout.closest("section").querySelector(".list");

    if (layout.classList.contains("layout-grid")) {
      const gridType = layout.querySelector(".type-grid");

      listType.addEventListener("click", () => {
        listType.classList.add("is-active");
        gridType.classList.remove("is-active");
        list.classList.add("type-list");
        list.classList.remove("type-grid");
      });

      gridType.addEventListener("click", () => {
        gridType.classList.add("is-active");
        listType.classList.remove("is-active");
        list.classList.add("type-grid");
        list.classList.remove("type-list");
      });
    }

    if (layout.classList.contains("layout-chart")) {
      const chartType = layout.querySelector(".type-chart");
      const chart = layout.closest("section").querySelector(".report");
      list.style.display = "none";

      listType.addEventListener("click", () => {
        listType.classList.add("is-active");
        chartType.classList.remove("is-active");
        list.style.display = "flex";
        chart.style.display = "none";
      });

      chartType.addEventListener("click", () => {
        chartType.classList.add("is-active");
        listType.classList.remove("is-active");
        chart.style.display = "flex";
        list.style.display = "none";
      });
    }
  });

  /* =====================================================
       Tab Menu
  ===================================================== */
  const tabs = document.querySelectorAll(".tabs li");
  const tabContents = document.querySelectorAll(".tab-content");

  const showTabContent = event => {
    event.stopPropagation();
    const tabName = event.target.dataset.tab;
    const tabs = document.querySelectorAll(`[data-tab='${tabName}']`);
    const tabContents = document.querySelectorAll(`.tab-content[data-tab='${tabName}']`);
    let menuIndex = [...tabs].indexOf(event.target);

    tabs.forEach(tab => {
      [...tabs].indexOf(tab) === menuIndex ? tab.classList.add("is-active") : tab.classList.remove("is-active");
    });

    tabContents.forEach(content => {
      [...tabContents].indexOf(content) === 0 && content.classList.add("is-active");
      [...tabContents].indexOf(content) === menuIndex
        ? content.classList.add("is-active")
        : content.classList.remove("is-active");
    });
  };

  tabs.forEach(tab => {
    [...tabs][0].classList.add("is-active");
    [...tabContents][0].classList.add("is-active");
    tab.addEventListener("click", showTabContent);
  });

  /* =====================================================
       Toggle
  ===================================================== */
  const toggles = document.querySelectorAll(".toggle");
  if (toggles) {
    toggles.forEach(toggle => {
      toggle.addEventListener("click", event => {
        const button = event.target;
        button.classList.toggle("is-active");
      });
    });
  }

  // ?????? ????????? ?????? ???????????? (?????? ???????????? ????????? ??????)
  const dataToggles = document.querySelectorAll("[data-toggle]");
  const controllers = document.querySelectorAll(".toggle-controller");
  controllers.forEach(controller => {
    controller.addEventListener("click", event => {
      const toggleName = event.target.dataset.toggle;
      const toggles = document.getElementsByName(toggleName);

      if (!controller.classList.contains("is-active")) {
        dataToggles.forEach(toggle => {
          event.target.dataset.toggle === toggle.dataset.toggle && (toggle.classList = controller.classList);
        });
      }
    });
    dataToggles.forEach(toggle => {
      if (!toggle.classList.contains(".controller")) {
        toggle.addEventListener("click", () => {
          toggle.classList.contains("is-active") && controller.classList.add("is-active");
        });
      }
    });
  });

  // ?????? ?????? ?????? disabled ??????
  const changeAlarmInformation = document.querySelector(".content-settings .change-information");
  if (changeAlarmInformation) {
    const select = document.getElementsByName("selectRecieveInformation");
    const detail1 = select[0].closest(".select").querySelector(".details");
    const detail2 = select[1].closest(".select").querySelector(".details");

    select.forEach(button => {
      button.addEventListener("click", event => {
        if (event.target === select[0]) {
          detail1.classList.add("is-active");
          detail2.classList.remove("is-active");
        } else {
          detail1.classList.remove("is-active");
          detail2.classList.add("is-active");

          const toggles = detail2.querySelectorAll(".toggle-switch");
          const inputDisabled = (event) => {
            const row = event.target.closest(".row");
            const checked = row.querySelector("input:checked")
            const inputs = row.querySelector(".inputs");
            checked
              ? (inputs.classList.add("is-active"))
              : (inputs.classList.remove("is-active"));
          };
          toggles.forEach(toggle => {
            toggle.addEventListener("click", inputDisabled);
          });
        }
      });

      if (select[0].checked) {
        detail1.classList.add("is-active");
        detail2.classList.remove("is-active");
      }
    });
  }

  /* =====================================================
       Checkbox: Check All
  ===================================================== */
  const checkAll = document.querySelectorAll(".check-all");
  if (checkAll) {
    checkAll.forEach(all => {
      const handleCheckAll = event => {
        const inputName = event.target.getAttribute("name");
        const checkboxes = document.getElementsByName(inputName);
        checkboxes.forEach(checkbox => {
          checkbox.checked = all.checked;

          const controller = checkbox.classList.contains("check-all");
          if (!controller.checked) {
            controller.checked = all.checked;
          }
        });
      };
      all.addEventListener("click", handleCheckAll);
    });
  }

  /* =====================================================
       Modal
  ===================================================== */
  const modals = document.querySelectorAll(".modal");

  const alertModal = document.createElement("div");
  alertModal.classList.add("modal", "modal-alert");
  alertModal.innerHTML = `
    <div class="dialog">
      <div class="modal-content"></div>
      <div class="buttons">
        <button class="btn-submit close" type="button">??????</button>
      </div>
    </div>
  `;

  const confirmModal = document.createElement("div");
  confirmModal.classList.add("modal", "modal-confirm");
  confirmModal.innerHTML = `
    <div class="dialog">
      <header class="modal-header">
        <div class="close"></div>
      </header>
      <div class="modal-content"></div>
      <div class="buttons">
        <button class="btn-cancel close" type="button">?????????</button>
        <button class="btn-submit" type="button">???</button>
      </div>
    </div>
  `;

  main.appendChild(confirmModal);
  main.appendChild(alertModal);

  const alertModalContent = alertModal.querySelector(".modal-content");
  const confirmModalContent = confirmModal.querySelector(".modal-content");

  // Modal Messages
  const modalMessage = {
    advancedSearch: "????????? ????????? ????????????.",
    apply: "????????? ?????????????????????.",
    ungroup: "??????????????? ?????????????????????.",
    createKeyword: "????????? ????????? ?????????????????????.",
    createGroup: "?????? ????????? ?????????????????????.",
    searchGroup: "????????? ?????????????????????.",
    createItemApply: "?????? ????????? ?????????????????????.",
    deleteKeyword:
      "???????????? ??????????????? ?????? ???????????? ?????? ???????????????. ?????????????????? ????????? ???????????? ???????????? ????????????. ????????? ?????????????????????????",
    deleteKeywordApply: "????????? ????????? ?????????????????????.",
    deleteItem:
      "?????? ?????? ??? ?????? ????????? ?????? ???????????? ???????????????. ?????????????????? ????????? ???????????? ???????????? ????????????. ????????? ?????????????????????????",
    deleteItemApply: "?????? ????????? ?????????????????????",
    deleteGroup: "?????? ?????? ??? ????????? ?????? ???????????? ????????? ???????????????. ?????? ????????? ?????????????????????????",
    deleteGroupApply: "?????? ????????? ?????????????????????.",
    selectGroup:
      "?????? ????????? ????????? ???????????? ????????????. ????????? ???????????? ?????? ?????? ????????? ?????? ????????? ???????????? ???????????????. ??????????????? ?????????????????????????",
    selectGroupApply: "??????????????? ?????????????????????.",
  };

  const initialize = () => {
    modals.forEach(modal => {
      modal.classList.remove("is-active");
      modal.removeAttribute("onclick");
    });

    alertModal.classList.remove("modal-apply");
  };

  const openModal = event => {
    event.preventDefault();
    const {target} = event;
    const modalData = target.dataset.modal;
    const targetModal = document.getElementById(modalData);
    if (targetModal) {
      targetModal.classList.add("is-active");
      targetModal.querySelector("[data-modal]").addEventListener("click", () => {
        setTimeout(() => {
          targetModal.querySelector("input").value = "";
        }, 500);
      });
    }

    const openAlertModal = () => {
      alertModal.classList.add("is-active");
      for (const property in modalMessage) {
        modalData === `${property}` && (alertModalContent.innerText = `${modalMessage[property]}`);
      }
    };

    const openConfirmModal = () => {
      confirmModal.classList.add("is-active");
      const submit = confirmModal.querySelector(".btn-submit");
      for (const property in modalMessage) {
        modalData === `${property}` && (confirmModalContent.innerHTML = `${modalMessage[property]}`);
      }

      submit.setAttribute("data-modal", `${modalData}Apply`);
      confirmModal.classList.add("is-active");
      submit.addEventListener("click", openAlertModal);
    };

    // Modal in Modal
    const currentModal = target.closest(".modal");
    const validateMessage = message => {
      alertModalContent.innerText = message;
      alertModal.classList.add("is-active");
    };

    // ??????, ??????
    if (modalData === "apply") {
      alertModal.classList.add("modal-apply");
      openAlertModal();
    }

    // ?????? ?????? ??????: ?????????????????? - ??????
    if (modalData === "searchItem") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("?????? URL??? ??????????????????.");
      } else {
        document.querySelector(".search-item").classList.add("is-active");
      }
    }

    // ?????? ??????????????? ?????? ????????? ????????? ?????????
    if (target.closest(".filters")) {
      const listItem = document.querySelector(".list-item");
      const checkboxes = listItem.querySelectorAll("input[type='checkbox']:checked");
      if (checkboxes.length === 0) {
        const customModal = document.getElementById(modalData);
        customModal && customModal.classList.remove("is-active");
        validateMessage("????????? ??????????????????.");
      } else {
        modalData === "deleteItem" && openConfirmModal();
        modalData === "ungroup" && openAlertModal();
      }
    }

    // ???????????????/??????: ???????????????
    if (modalData === "createKeyword") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("???????????? ??????????????????.");
      } else {
        openAlertModal();
      }
    }

    // ????????? ????????? ??????
    if (modalData === "searchKeyword") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("???????????? ??????????????????.");
      }
    }

    // ???????????????/??????: ????????????
    if (modalData === "deleteKeyword") {
      const checkboxes = currentModal.querySelectorAll("input[type='checkbox']:checked");
      if (checkboxes.length === 0) {
        validateMessage("???????????? ??????????????????.");
      } else {
        openConfirmModal();
      }
    }

    // ?????? ?????? ??????: ?????????????????? - ????????????
    if (modalData === "createGroup") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("???????????? ??????????????????.");
      } else {
        openAlertModal();
      }
    }

    // ?????? ?????? ??????: ?????????????????? - ????????????
    if (modalData === "deleteGroup") {
      const checkboxes = currentModal.querySelectorAll("input[type='checkbox']:checked");
      if (checkboxes.length === 0) {
        validateMessage("????????? ??????????????????.");
      } else {
        checkboxes.forEach(checked => {
          const row = checked.closest(".row");
          row.remove();
        });
        openConfirmModal();
      }
    }

    // ????????? ??????: ?????????????????? - ????????????
    if (modalData === "createItemStep2") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("???????????? ??????????????????.");
      } else {
        document.querySelector(".create-item-step2").classList.add("is-active");
      }
    }

    // ????????? ??????: ?????????????????? - ??????
    if (modalData === "createItemStep3") {
      if (currentModal.querySelector("input").value === "") {
        validateMessage("?????? URL??? ??????????????????.");
      } else {
        document.querySelector(".create-item-step3").classList.add("is-active");
      }
    }

    // ????????? ??????: ?????????????????? - ??????
    if (modalData === "createItemApply") {
      alertModal.classList.add("modal-apply");
      openAlertModal();
    }

    if (modalData === "advancedSearch") {
      const advancedSearch = target.closest(".advanced-search");
      if (advancedSearch.querySelector("textarea").value === "") {
        validateMessage("????????? ????????? ????????????.");
      } else {
      }
    }
  };

  // Basic Modal
  const modalButtons = document.querySelectorAll("[data-modal]");
  modalButtons.forEach(button => {
    button.addEventListener("click", openModal);

    // ????????????
    if (button.nodeName === "OPTION") {
      button.parentElement.addEventListener("change", () => {
        if (button.selected) {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "??????????????? ?????????????????????.";
        }
      });
    }
  });

  // Close Modal
  const closeModal = event => {
    const modal = event.target.closest(".modal");
    modal.classList.remove("is-active");
    modal.classList.contains("modal-apply");

    if (alertModal) {
      alertModal.classList.remove("is-active");
      alertModalContent.innerText = "";
    }
    if (confirmModal) {
      confirmModal.classList.remove("is-active");
      confirmModalContent.innerHTML = "";
    }

    modal.classList.contains("modal-apply") && initialize();
  };

  const closeButtons = document.querySelectorAll(".modal .close");
  if (closeButtons) {
    closeButtons.forEach(close => {
      close.addEventListener("click", closeModal);
    });
  }

  /* =====================================================
       Advanced Search
  ===================================================== */
  const advancedSearch = document.querySelector(".advanced-search");
  if (advancedSearch) {
    const button = document.querySelector(".btn-advanced-search");
    const inputs = advancedSearch.querySelectorAll("input[type='text'], input[type='number'], textarea");
    const checkboxes = advancedSearch.querySelectorAll("input[type='checkbox']");
    const selections = advancedSearch.querySelectorAll(".select input:first-of-type");

    //?????????
    const initialize = () => {
      inputs.forEach(input => {
        input.value = "";
      });

      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });

      selections.forEach(select => {
        select.checked = true;
      });
    };

    button.addEventListener("click", () => {
      initialize();
      advancedSearch.classList.toggle("is-active");
    });

    // ?????????
    const clear = advancedSearch.querySelector(".clear");
    clear.addEventListener("click", initialize);

    // ????????? ????????????
    const itemCreated = advancedSearch.querySelector(".item-created");
    const calendar = itemCreated.querySelector(".calendar");
    const options = itemCreated.querySelectorAll(".select input");

    options.forEach(option => {
      const choose = event => {
        event.target.dataset.select === "yes"
          ? calendar.classList.add("is-active")
          : calendar.classList.remove("is-active");
      };
      option.addEventListener("click", choose);
    });

    // ????????? ??????
    // const keyword = advancedSearch.querySelector("textarea");
    // keyword.addEventListener("keyup", event => {
    //   const {target, code} = event;
    //   if (code === "Comma") {
    //     const keywords = target.value.split(",");
    //     const wrapper = document.createElement("div");
    //     wrapper.classList.add("keyword");
    //     keywords.forEach(keyword => {
    //       wrapper.appendChild(keyword);
    //     });
    //   }
    // });
  }

  /* =====================================================
       Filters: ????????? ????????? ?????? ????????????
  ===================================================== */
  const selectors = document.querySelectorAll(".filters .selector.main");
  if (selectors[0]) {
    selectors.forEach(mainSelector => {
      const subSelectors = mainSelector.parentElement.querySelectorAll(".selector.sub");
      const selects = mainSelector.querySelectorAll("input");
      selects[0].checked = true;
      subSelectors[0].classList.add("is-active");

      selects.forEach(selected => {
        selected.addEventListener("click", event => {
          const {target} = event;
          subSelectors.forEach(sub => {
            const initialize = () => {
              sub.classList.remove("is-active");
            };
            const checkSelect = () => {
              if (target.classList.contains("select-word") && sub.classList.contains("selector-word")) {
                sub.classList.add("is-active");
              }
              if (
                (target.classList.contains("select-category") && sub.classList.contains("selector-category")) ||
                sub.classList.contains("selector-word")
              ) {
                sub.classList.add("is-active");
              }

              if (
                target.classList.contains("select-number") &&
                (sub.classList.contains("selector-device") || sub.classList.contains("selector-number"))
              ) {
                sub.classList.add("is-active");
              }
            };

            initialize();
            checkSelect();
            sub.addEventListener("change", () => {
              initialize();
              checkSelect();
            });
          });
        });
      });
    });
  }

  /* =====================================================
       Filters: ????????? ????????? ?????? ?????????
  ===================================================== */

  /* =====================================================
       Filters: ????????? ????????? > ?????? ????????? ?????????
  ===================================================== */

  const searchButtons = document.querySelectorAll(".content-keyword-trend-details .search button");

  searchButtons.forEach(button => {
    button.addEventListener("click", event => {
      const {target} = event;
      const content = target.closest(".tab-content");
      const searchInput = content.querySelector(".search input");
      const clearInput = content.querySelector(".x");
      const selectedFilters = content.querySelector(".selected-filters");

      const validateFilters = () => {
        if (searchInput.value !== "") {
          addSelectedFilters();
          removeSelectedFilters();
          searchInput.value = "";
          clearInput.classList.remove("is-active");
        } else {
          alertModal.classList.add("is-active");
          alertModalContent.innerText = "???????????? ??????????????????.";
        }
      };

      const addSelectedFilters = () => {
        const selectors = content.querySelectorAll(".filters .selector");
        const selected = document.createElement("ul");
        const filter = document.createElement("li");
        filter.classList.add("ico-filter");

        selectors.forEach(selector => {
          if (selector.classList.contains("main") || selector.classList.contains("is-active")) {
            const span = document.createElement("span");
            const text = selector.querySelector("input:checked + label").innerText;

            span.innerText = `${text}`;
            return filter.append(span);
          }
        });
        filter.innerHTML += `<span>${searchInput.value}</span>`;
        filter.innerHTML += `<div class="x close"></div>`;

        selectedFilters.appendChild(selected);
        selected.appendChild(filter);
      };

      const removeSelectedFilters = () => {
        const closes = selectedFilters.querySelectorAll(".x");
        closes.forEach(close => {
          close.addEventListener("click", event => {
            event.target.parentElement.remove();
          });
        });
      };

      validateFilters();
    });
  });

  /* =====================================================
       Section Keyword History: List Scroll: css??? ??????
  ===================================================== */
  // const listScroll = document.querySelector(".list.scroll");

  // if (listScroll) {
  //   var scrollVertical01 = document.querySelector(".scroll-vertical-01");
  //   var scrollVertical02 = document.querySelector(".scroll-vertical-02");
  //   var scrollHorizontal01 = document.querySelector(".scroll-horizontal-01");
  //   var scrollHorizontal02 = document.querySelector(".scroll-horizontal-02");

  //   if (scrollVertical01) {
  //     const handleScrollVertical = () => {
  //       scrollVertical01.scrollTop = scrollVertical02.scrollTop;
  //     };
  //     scrollVertical02.addEventListener("scroll", handleScrollVertical);
  //   }

  //   if (scrollHorizontal01) {
  //     const handleScrollHorizontal = () => {
  //       scrollHorizontal01.scrollLeft = scrollHorizontal02.scrollLeft;
  //     };

  //     scrollHorizontal02.addEventListener("scroll", handleScrollHorizontal);
  //   }
  // }

  const hamburgMenu = document.querySelector(".hamburg-menu");
  hamburgMenu.addEventListener("click", () => {
    const aside = document.querySelector("aside");
    hamburgMenu.classList.toggle("is-active");
    aside.classList.toggle("is-active");
  });

  /* =====================================================
       Dropdown
  ===================================================== */
  const dropdown = document.querySelector(".dropdown");
  dropdown.addEventListener("click", (event) => {
    console.log(event.target)
    event.target.closest("li").classList.toggle("is-active")
  })
});
