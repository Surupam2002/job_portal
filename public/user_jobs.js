document.addEventListener('DOMContentLoaded', async function() {
    const jobList = document.getElementById('job-list');

    const fetchJobs = async () => {
        const response = await fetch('/api/jobs');
        const jobs = await response.json();
        jobList.innerHTML = '';
        jobs.forEach(job => {
            const listItem = document.createElement('li');
            listItem.textContent = `${job.title} at ${job.company} - ${job.location}`;
            jobList.appendChild(listItem);
        });
    };

    fetchJobs();
});
