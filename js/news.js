// NEXMII Lab News Items
// Format: Add new items at the beginning of the array to maintain chronological order (newest first)

const labNews = [
    {
        date: "March 2025",
        title: "NEXMII Lab Research Featured in Georgia Public Broadcasting",
        content: "Dr. Wang discusses her groundbreaking research on predicting youth mental health risks using AI in an interview with GPB News. The study, published in Nature Medicine, reveals that sleep disturbances in children are the strongest predictor of future psychiatric illness.",
        tags: ["Media", "Mental Health", "Publication"]
    },
    {
        date: "March 2025",
        title: "Nature Medicine Publication on Mental Health Prediction",
        content: "Groundbreaking research on predicting adolescent mental health risk published in Nature Medicine, offering new pathways for early intervention using advanced machine learning.",
        tags: ["Publication", "Mental Health"]
    },
    {
        date: "February 2025",
        title: "NEXMII Lab Welcomes New Postdoctoral Fellow",
        content: "Dr. Ruiying Liu joins NEXMII, bringing specialized expertise in neuroimaging analysis to strengthen our research capabilities in infant brain development.",
        tags: ["Team", "Growth"]
    },
    {
        date: "April 2024",
        title: "Two Major NIH Grants Awarded to NEXMII Lab",
        content: "NEXMII Lab secures R00 from NICHD and R01 from NIMH totaling over $3M to advance AI tools for infant brain development and investigate prenatal obesity impacts on neurodevelopment.",
        tags: ["Funding", "Grants"]
    },
    {
        date: "February 2024",
        title: "NEXMII Lab Opens Its Doors",
        content: "February 18, 2024 marks the official launch of the NEXMII Lab at Emory University, beginning our journey to advance maternal and infant health through innovative informatics solutions.",
        tags: ["Milestone", "Lab News"]
    },
    {
        date: "June 2024", 
        title: "New Publication in IEEE/CVF Conference on Computer Vision",
        content: "Our MAPSeg framework for medical image segmentation accepted to the prestigious CVPR conference, bringing breakthrough innovations in heterogeneous domain adaptation for neuroimaging.",
        tags: ["Publication", "Computer Vision"]
    },
    {
        date: "June 2024",
        title: "Research Specialist Joins NEXMII Team",
        content: "Noah Marchuck joins as Research Specialist, enhancing our team with expertise in research coordination and project management.",
        tags: ["Team", "Growth"]
    }
];

// Optionally filter news by year or tag
function filterNewsByYear(year) {
    return labNews.filter(item => item.date.includes(year));
}

function filterNewsByTag(tag) {
    return labNews.filter(item => item.tags.includes(tag));
} 