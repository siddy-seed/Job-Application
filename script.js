document.addEventListener("DOMContentLoaded", function () {
    const jobForm = document.getElementById("jobForm");
    const jobList = document.getElementById("jobList");
    const filterStatus = document.getElementById("filterStatus");

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    function renderJobs(filter = "All") {
        jobList.innerHTML = "";
        jobs
            .filter(job => filter === "All" || job.status === filter)
            .forEach((job, index) => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${job.company}</strong> - ${job.role} <br>
                    Status: <em>${job.status}</em> | Applied: ${job.date} 
                    <button class="delete-btn" onclick="deleteJob(${index})">Delete</button>
                `;
                jobList.appendChild(li);
            });
    }

    function saveJobs() {
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }

    jobForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const company = document.getElementById("company").value;
        const role = document.getElementById("role").value;
        const status = document.getElementById("status").value;
        const dateApplied = document.getElementById("dateApplied").value;

        jobs.push({ company, role, status, date: dateApplied });
        saveJobs();
        renderJobs();

        jobForm.reset();
    });

    window.deleteJob = function (index) {
        jobs.splice(index, 1);
        saveJobs();
        renderJobs();
    };

    filterStatus.addEventListener("change", function () {
        renderJobs(filterStatus.value);
    });

    renderJobs();
});
