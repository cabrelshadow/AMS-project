document.addEventListener("DOMContentLoaded", () => {
	const getValidateForms = document.querySelectorAll("form[novalidate]");
	getValidateForms.forEach((form, i) => {
		// get submit button in form
		const submitButton = form.querySelector("button[type=submit]");
		submitButton &&
			submitButton.addEventListener("click", (e) => {
				const inputs = form.querySelectorAll("[required]");
				inputs.forEach((getinput) => {
					if (
						getinput.value === "" ||
						(getinput.getAttribute("type") === "checkbox" && !getinput.checked)
					) {
						getinput.style.borderColor = "red";
						e.preventDefault();
					} else {
						submitButton.innerText = "loading ...";
						getinput.style.borderColor = "green";
					}
				});
			});
	});
});

//link

const Links = document.querySelectorAll("[link]");

Links.forEach((link) => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		console.log(link);
		const href = link.getAttribute("href");
		const method = link.getAttribute("method");
		const data = link.getAttribute("data") ?? {};
		if (String(method).toLocaleLowerCase() !== "get") {
			console.log(data);
			fetch(href, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: link.hasAttribute("data") ? JSON.stringify(data) : {},
			})
				.then(async (r) => {
					if (r.ok && link.hasAttribute("redirect")) {
						location.href = `${link.getAttribute("redirect")}`;
					} //else location.reload();
					console.log(await r.json());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			fetch(href, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(async (r) => {
					if (r.ok && link.hasAttribute("redirect")) {
						location.href = `${link.getAttribute("redirect")}`;
					} else location.reload();
					console.log(await r.json());
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
});

const confirmLinks = document.querySelectorAll("[confirm]");

confirmLinks.forEach((confirmLink) => {
	confirmLink.addEventListener("click", (e) => {
		const getConfirm = confirm(confirmLink.getAttribute("confirm-msg"));
		if (!getConfirm) {
			e.preventDefault();
		}
	});
});

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll("[table-sort]").forEach((table) => {
		new DataTable(table, {
			autoFill: false,
			info: true,
			ordering: table.hasAttribute("order"),
			responsive: table.hasAttribute("responsive"),
			buttuns: ["print", "pdf"],
		});
	});
});
