document.addEventListener('DOMContentLoaded', async function() {
    const addJobForm = document.getElementById('add-job-form');
    const jobList = document.getElementById('job-list');

    const fetchJobs = async () => {
        const response = await fetch('/api/jobs');
        const jobs = await response.json();
        jobList.innerHTML = '';
        jobs.forEach(job => {
            const listItem = document.createElement('li');
            listItem.textContent = `${job.title} at ${job.company} - ${job.location}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await fetch(`/api/jobs/${job.id}`, { method: 'DELETE' });
                fetchJobs();
            });
            listItem.appendChild(deleteButton);
            jobList.appendChild(listItem);
        });
    };

    addJobForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(addJobForm);
        const jobData = {
            title: formData.get('title'),
            company: formData.get('company'),
            description: formData.get('description'),
            location: formData.get('location')
        };
        await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
        });
        addJobForm.reset();
        fetchJobs();
    });

    fetchJobs();
});
