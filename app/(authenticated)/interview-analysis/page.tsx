"use client"

// Added these type definitions only for build
interface DemographicFactor {
  name: string;
  key: string;
}

interface DemographicData {
  [key: string]: {
    [factor: string]: number;
  };
}

interface QuoteFinderProps {
  onClose: () => void;
  selectedText: string;
}




import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BarChart2, FileText, Home, Users, BarChart as BarChartIcon, Upload, Settings, LogOut, Sun, Moon, ChevronRight, Lightbulb, History, Search } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const interviewData = {
projectName: "Cosmetic Product Market Research",
interviewName: "Focus Group: Cosmetic Products and Sustainability",
uploadDate: "2023-09-26T14:30:00Z",
analysisStatus: "completed",
transcriptData: [
  { time: "00:00", speaker: "Moderator", text: "Welcome to our focus group on cosmetic products. Today we'll discuss various aspects such as product selection, packaging, and sustainability." },
  { time: "00:30", speaker: "Thomas", text: "That's a very general question. The requirements depend on the product. They are different for a perfume than for a hand cream." },
  { time: "01:00", speaker: "Anna", text: "Personally, the ingredients are particularly important to me. They need to be as natural as possible - I eat vegan and therefore I only buy vegan products." },
  { time: "01:30", speaker: "Sarah", text: "For a high-quality product, the packaging is very important to me. If I buy an expensive product, I also want beautiful and high-quality packaging." },
  { time: "02:00", speaker: "Lisa", text: "To be honest, I'm a bit like Anna - so when I look in my bathroom cabinet, I do pay attention to whether creams or my hair mask are sustainable." },
  { time: "02:30", speaker: "Michael", text: "I think that effectiveness is the most important thing. What good is a sustainable product if it doesn't work?" },
  { time: "03:00", speaker: "Julia", text: "For me, a combination of everything is important: natural ingredients, good effect, appealing packaging, and a fair price." },
],
conceptData: [
  { 
    concept: "Ingredients", 
    opinions: [
      { speaker: "Anna", opinion: "Natural ingredients important", sentiment: "Positive" },
      { speaker: "Thomas", opinion: "Product dependent", sentiment: "Neutral" },
      { speaker: "Sarah", opinion: "No animal testing", sentiment: "Positive" },
      { speaker: "Lisa", opinion: "Sustainable products preferred", sentiment: "Positive" },
      { speaker: "Michael", opinion: "Effectiveness more important", sentiment: "Negative" },
      { speaker: "Julia", opinion: "Natural ingredients preferred", sentiment: "Positive" },
    ]
  },
  { 
    concept: "Packaging", 
    opinions: [
      { speaker: "Sarah", opinion: "High-quality for expensive products", sentiment: "Positive" },
      { speaker: "Anna", opinion: "Functionality more important than appearance", sentiment: "Negative" },
      { speaker: "Lisa", opinion: "Environmentally friendly materials", sentiment: "Positive" },
      { speaker: "Thomas", opinion: "Less plastic is better", sentiment: "Positive" },
      { speaker: "Michael", opinion: "Secondary to effectiveness", sentiment: "Neutral" },
      { speaker: "Julia", opinion: "Appealing packaging important", sentiment: "Positive" },
    ]
  },
  { 
    concept: "Sustainability", 
    opinions: [
      { speaker: "Lisa", opinion: "Important, but not always feasible", sentiment: "Neutral" },
      { speaker: "Thomas", opinion: "Good for conscience", sentiment: "Positive" },
      { speaker: "Sarah", opinion: "Trend towards more sustainability", sentiment: "Positive" },
      { speaker: "Anna", opinion: "Vegan products preferred", sentiment: "Positive" },
      { speaker: "Michael", opinion: "Secondary to effectiveness", sentiment: "Negative" },
      { speaker: "Julia", opinion: "Important aspect in product choice", sentiment: "Positive" },
    ]
  },
  { 
    concept: "Price-Performance", 
    opinions: [
      { speaker: "Thomas", opinion: "Important purchase criterion", sentiment: "Neutral" },
      { speaker: "Sarah", opinion: "Willing to pay more for quality", sentiment: "Positive" },
      { speaker: "Anna", opinion: "Must match the product", sentiment: "Neutral" },
      { speaker: "Lisa", opinion: "Sustainable products may cost more", sentiment: "Positive" },
      { speaker: "Michael", opinion: "Decisive for purchase decision", sentiment: "Neutral" },
      { speaker: "Julia", opinion: "Fair price important", sentiment: "Positive" },
    ]
  },
  { 
    concept: "Effectiveness", 
    opinions: [
      { speaker: "Michael", opinion: "Highest priority", sentiment: "Positive" },
      { speaker: "Anna", opinion: "Important, but not at the expense of ingredients", sentiment: "Neutral" },
      { speaker: "Sarah", opinion: "Expected in premium products", sentiment: "Positive" },
      { speaker: "Thomas", opinion: "Depends on product type", sentiment: "Neutral" },
      { speaker: "Lisa", opinion: "Important, but not sole criterion", sentiment: "Neutral" },
      { speaker: "Julia", opinion: "Essential for satisfaction", sentiment: "Positive" },
    ]
  },
  { 
    concept: "Brand Image", 
    opinions: [
      { speaker: "Sarah", opinion: "Important for premium products", sentiment: "Positive" },
      { speaker: "Michael", opinion: "Secondary to product quality", sentiment: "Neutral" },
      { speaker: "Anna", opinion: "Pays attention to ethical corporate management", sentiment: "Positive" },
      { speaker: "Thomas", opinion: "Plays a role in purchase decision", sentiment: "Neutral" },
      { speaker: "Lisa", opinion: "Prefers known brands", sentiment: "Positive" },
      { speaker: "Julia", opinion: "Important, but not decisive", sentiment: "Neutral" },
    ]
  },
],
speakersData: [
  {
    name: "Sarah",
    age: 35,
    gender: "Female",
    profession: "Marketing Manager",
    familyStatus: "Married, 1 kid",
    summary: "Values high-quality packaging for premium products and observes trends in the cosmetics industry.",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "Thomas",
    age: 28,
    gender: "Male",
    profession: "Environmental Engineer",
    familyStatus: "Single",
    summary: "Emphasizes the importance of sustainability and environmentally friendly packaging in the cosmetics industry.",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Thomas"
  },
  {
    name: "Lisa",
    age: 42,
    gender: "Female",
    profession: "Yoga Instructor",
    familyStatus: "Married, 2 kids",
    summary: "Tries to buy sustainable products but recognizes the challenges in consistent implementation.",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Lisa"
  },
  {
    name: "Anna",
    age: 31,
    gender: "Female",
    profession: "Nutritionist",
    familyStatus: "Single",
    summary: "Places great importance on natural ingredients and vegan products, both in nutrition and cosmetics.",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Anna"
  },
  {
    name: "Michael",
    age: 39,
    gender: "Male",
    profession: "Pharmacist",
    familyStatus: "Married, no kids",
    summary: "Focuses mainly on the effectiveness of products and their scientific foundations.",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Michael"
  },
  {
    name: "Julia",
    age: 33,
    gender: "Female",
    profession: "Graphic Designer",
    familyStatus: "Single",
    summary: "Seeks a balanced combination of aesthetics, sustainability, and effectiveness in cosmetic products.",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Julia"
  },
],
interviewSections: [
  { time: "00:00", title: "Introduction and Presentation" },
  { time: "05:30", title: "Discussion: Product Selection" },
  { time: "15:45", title: "Topic: Packaging and Design" },
  { time: "30:20", title: "Focus: Sustainability in Cosmetics" },
  { time: "45:10", title: "Debate: Price-Performance Ratio" },
  { time: "55:30", title: "Concluding Remarks" },
],
keyTakeaways: {
  mainPoints: [
    "Natural ingredients and sustainability are important factors in product selection.",
    "For luxury cosmetics, a balance between aesthetic packaging and functionality is expected.",
    "There is a growing awareness of sustainability, but also challenges in identifying truly sustainable products.",
    "Consumers are willing to pay more for sustainable and high-quality products.",
    "Vegan products and products without animal testing are strongly preferred by some consumers.",
    "Packaging plays an important role, especially for premium products, but functionality is often prioritized.",
    "Effectiveness remains a decisive criterion for many consumers when choosing products.",
    "Brand image influences the purchase decision, but is not equally important for all consumers.",
  ],
  recommendations: [
    "Develop products with natural, vegan ingredients to serve the growing demand.",
    "Invest in sustainable packaging solutions that are both aesthetically pleasing and functional.",
    "Clearly communicate the sustainability aspects of products to make identification easier for consumers.",
    "Introduce premium lines focusing on sustainability to appeal to environmentally conscious luxury consumers.",
    "Develop refill systems for cosmetic products to reduce plastic waste.",
    "Implement transparent pricing that justifies the added value of sustainable and high-quality products.",
    "Emphasize effectiveness more strongly in product communication, especially for sustainable products.",
    "Build a strong brand image that combines quality, sustainability, and innovation.",
  ],
},
}


const analysisTabs = [
  { id: 'video-transcript', label: 'Video & Transcript' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'key-takeaways', label: 'Key Takeaways' },
  { id: 'deep-analysis', label: 'Deep Analysis' },
  { id: 'concepts', label: 'Concepts' },
  { id: 'custom-analysis', label: 'Custom Analysis' },
  { id: 'demographic-correlations', label: 'Demographic Correlations' }, // Add this line
]

const analysisData = {
  sections: [
    {
      title: "Product Selection",
      content: "Consumers consider various factors when choosing cosmetic products, including product-specific requirements, price-performance ratio, brand reputation, recommendations, ingredients, environmental concerns, and packaging. Natural and vegan products are preferred, with emphasis on avoiding animal testing and microplastics.",
      quotes: [
        {
          text: "Das ist eine sehr allgemein gestellte Frage. Die Anforderungen hängen vom Produkt ab. Sie sind bei einem Parfüm anders, als bei einer Handcreme.",
          author: "T7"
        },
        {
          text: "Mir persönlich sind die Inhaltstoffe besonders wichtig. Die müssen möglichst natürlich sein – ich ernähre mich vegan und deshalb kaufe ich auch nur vegane Produkte (…) Cremen, die an Tieren getestet werden, kaufe ich nicht.",
          author: "T9"
        }
      ],
      table: {
        title: "Key Factors in Product Selection",
        headers: ["Factor", "Importance", "Consumer Preference"],
        rows: [
          ["Ingredients", "High", "Natural, vegan, no animal testing"],
          ["Price-Performance", "Medium", "Value for money"],
          ["Brand Reputation", "Medium", "Trusted brands preferred"],
          ["Environmental Impact", "Increasing", "Sustainable products gaining popularity"],
          ["Packaging", "Low to Medium", "Functional, attractive for premium products"]
        ]
      }
    },
    {
      title: "Packaging and Functionality",
      content: "For luxury cosmetics, there's a balance between aesthetics and functionality in packaging. While high-quality packaging is expected for expensive products, functionality often takes precedence. Issues with accessing all product content and impractical designs were noted. Some consumers display luxury products in their bathrooms.",
      quotes: [
        {
          text: "Bei einem hochwertigen Produkt, ist mir die Verpackung sehr wichtig. Wenn ich ein teures Produkt kaufe, will ich auch eine schöne und hochwertige Verpackung.",
          author: "T6"
        },
        {
          text: "Es bringt mir nichts, wenn eine Handcreme schön aussieht, die Tube aber dumm gemacht ist und immer ein Rest in der Tube bleibt.",
          author: "T9"
        }
      ],
      table: {
        title: "Packaging Preferences",
        headers: ["Aspect", "Consumer Expectation", "Importance"],
        rows: [
          ["Aesthetics", "High-quality look for premium products", "Medium"],
          ["Functionality", "Easy to use, access all product", "High"],
          ["Material", "Sustainable materials preferred", "Increasing"],
          ["Information", "Clear product details and usage instructions", "High"],
          ["Reusability", "Option for refills or repurposing", "Growing"]
        ]
      }
    },
    {
      title: "Sustainability",
      content: "There's growing importance of sustainability in cosmetic choices, but challenges exist in identifying truly sustainable products. Consumers often balance sustainability with personal preferences and product efficacy. Perceptions of sustainability in premium cosmetics are mixed, with some noting improvements while others remain skeptical.",
      quotes: [
        {
          text: "Um ehrlich zu sein, bin ich auch ein bisschen wie Anna – also ich achte, wenn ich in meinen Badezimmerschrank schaue, schon darauf, dass Cremen oder meine Haarmaske nachhaltig ist. Aber ich habe zum Beispiel auch eine Wimperntusche von Clarins (…) die mag ich einfach gerne (…) und ich glaube nicht, dass sie so nachhaltig ist.",
          author: "T8"
        },
        {
          text: "Wenn ich ehrlich bin, habe ich vom Trend zu mehr Nachhaltigkeit in der Premiumkosmetik noch nicht so viel mitbekommen, gerade im Vergleich zu anderen Branchen, wie beispielsweise der Lebensmittelindustrie.",
          author: "T7"
        }
      ],
      table: {
        title: "Sustainability in Cosmetics",
        headers: ["Aspect", "Consumer Attitude", "Industry Progress"],
        rows: [
          ["Ingredients", "Preference for natural and organic", "Increasing use of natural ingredients"],
          ["Packaging", "Desire for recyclable materials", "Some brands introducing eco-friendly packaging"],
          ["Animal Testing", "Strong opposition", "Many brands going cruelty-free"],
          ["Carbon Footprint", "Growing awareness", "Some efforts to reduce, but more needed"],
          ["Transparency", "Demand for clear information", "Improvement needed in communication"]
        ]
      }
    },
    // ... (include the rest of the sections from the new analysisData)
  ]
};

const suggestionTopics = [
"Comparison of consumer perceptions of sustainability in premium vs. regular cosmetics",
"Examination of perceived barriers to adopting more sustainable cosmetic products",
"Multi-dimensional analysis of the interplay between product efficacy, sustainability, packaging aesthetics, and price in consumer decision-making for luxury cosmetics"
]

const demographicFactors: DemographicFactor[] = [
  { name: 'Sustainability Concern', key: 'sustainabilityConcern' },
  { name: 'Eco-Friendly Packaging', key: 'ecoFriendlyPackaging' },
  { name: 'Refillable Options', key: 'refillableOptions' },
  { name: 'Aesthetics Importance', key: 'aestheticsImportance' },
  { name: 'Price Sensitivity', key: 'priceSensitivity' },
  { name: 'Brand Loyalty', key: 'brandLoyalty' },
]

const ageGroups = ['25-35', '35-45', '45-55']
const genders = ['Male', 'Female']
const familyStatuses = ['Single', 'Married with Children']

// const generateDemographicData = (): DemographicData => {
//   const data = {}
//   ageGroups.forEach(age => {
//     genders.forEach(gender => {
//       familyStatuses.forEach(status => {
//         const key = `${age}-${gender}-${status}`
//         data[key] = {}
//         demographicFactors.forEach(factor => {
//           data[key][factor.key] = Math.floor(Math.random() * 5) + 1
//         })
//       })
//     })
//   })
//   return data
// }

// Added below function as modification of the above -- JUST FOR BUILD

// Update the generateDemographicData function
const generateDemographicData = (): DemographicData => {
  const data = {} as DemographicData;
  ageGroups.forEach(age => {
    genders.forEach(gender => {
      familyStatuses.forEach(status => {
        const key = `${age}-${gender}-${status}` as string;
        data[key] = {};
        demographicFactors.forEach(factor => {
          data[key][factor.key] = Math.floor(Math.random() * 5) + 1;
        });
      });
    });
  });
  return data;
};

const demographicData: DemographicData = generateDemographicData()

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']

// const QuoteFinder = ({ onClose, selectedText }) => {
//   const [quotes, setQuotes] = useState([])

// Added JUST FOR BUILD -- above function is actual
const QuoteFinder: React.FC<QuoteFinderProps> = ({ onClose, selectedText }) => {
  const [quotes, setQuotes] = useState<Array<{ text: string; author: string }>>([])

  useEffect(() => {
    // Sample quotes that will always show up
    const sampleQuotes = [
      {
        text: "Das ist eine sehr allgemein gestellte Frage. Die Anforderungen hängen vom Produkt ab. Sie sind bei einem Parfüm anders, als bei einer Handcreme.",
        author: "T7"
      },
      {
        text: "Mir persönlich sind die Inhaltstoffe besonders wichtig. Die müssen möglichst natürlich sein – ich ernähre mich vegan und deshalb kaufe ich auch nur vegane Produkte.",
        author: "T9"
      },
      {
        text: "Bei einem hochwertigen Produkt, ist mir die Verpackung sehr wichtig. Wenn ich ein teures Produkt kaufe, will ich auch eine schöne und hochwertige Verpackung.",
        author: "T6"
      }
    ];

    // If there's selected text, filter quotes that include it
    if (selectedText) {
      const foundQuotes = analysisData.sections.flatMap(section => 
        section.quotes.filter(quote => 
          quote.text.toLowerCase().includes(selectedText.toLowerCase())
        )
      );
      // Combine found quotes with sample quotes
      setQuotes([...sampleQuotes, ...foundQuotes]);
    } else {
      // If no text is selected, just show sample quotes
      setQuotes(sampleQuotes);
    }
  }, [selectedText]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Related Quotes</h3>
      {quotes.map((quote, index) => (
        <blockquote key={index} className="border-l-4 border-primary pl-4 my-4">
          <p className="italic text-sm mb-2">"{quote.text}"</p>
          <footer className="text-right text-xs text-muted-foreground">- {quote.author}</footer>
        </blockquote>
      ))}
      <Button onClick={onClose} className="mt-4">Close</Button>
    </div>
  )
}

export default function InterviewAnalysis() {
const [activeTab, setActiveTab] = useState('dashboard')
const [activeSection, setActiveSection] = useState(analysisData.sections[0].title)
const { theme, setTheme } = useTheme()
const [searchQuery, setSearchQuery] = useState('')
const [analysisType, setAnalysisType] = useState('concise')
const [selectedTopic, setSelectedTopic] = useState('')
const [analysis, setAnalysis] = useState('')
const [isAnalyzing, setIsAnalyzing] = useState(false)
const [analysisHistory, setAnalysisHistory] = useState<string[]>([])
const [selectedText, setSelectedText] = useState("")
const [showQuoteFinder, setShowQuoteFinder] = useState(false)
const [quoteFinderPosition, setQuoteFinderPosition] = useState({ x: 0, y: 0 })

// Commented for BUILD
// const quoteFinderRef = useRef(null)
const quoteFinderRef = useRef<HTMLDivElement | null>(null);

// const mainContentRef = useRef(null)
const mainContentRef = useRef<HTMLDivElement | null>(null);

const [selectedAge, setSelectedAge] = useState(ageGroups[0])
const [selectedGender, setSelectedGender] = useState(genders[0])
const [selectedFamilyStatus, setSelectedFamilyStatus] = useState(familyStatuses[0])
  // Add the getRadarData function here
const getRadarData = () => {
  const key = `${selectedAge}-${selectedGender}-${selectedFamilyStatus}`
  return demographicFactors.map(factor => ({
    subject: factor.name,
    A: demographicData[key][factor.key],
    fullMark: 5,
  }))
}

const handleTopicClick = (topic: string) => {
  setSelectedTopic(topic)
  setSearchQuery(topic)
}

const handleAnalyze = () => {
  if (!searchQuery) return
  setIsAnalyzing(true)
  // Simulating analysis delay
  setTimeout(() => {
    const exampleAnalysis = `Analysis results for: ${searchQuery}

Here's a concise analysis comparing consumer perceptions of sustainability in premium vs. regular cosmetics:

Limited awareness of sustainability in premium cosmetics:
• Participants generally didn't perceive premium cosmetics as more sustainable than regular ones.
• There was little mention of sustainability initiatives by premium brands.

Packaging expectations:
• Premium cosmetics were associated with more luxurious, often less sustainable packaging (e.g., heavy glass containers).
• Participants noted a slight trend towards reducing excess packaging in premium products, but didn't see it as a major focus.

Refill options:
• Some awareness of refill options in premium brands (e.g., Thierry Mugler perfumes), but limited experience using them.
• Refills were seen as more common in regular or eco-focused brands rather than premium ones.

Price vs. sustainability:
• Participants expected premium products to potentially do more for sustainability given their higher prices, but didn't observe this in practice.
• Some skepticism about premium brands' sustainability claims, viewing them more as marketing than genuine efforts.

Quality and efficacy prioritized:
• For premium products, participants prioritized quality, efficacy, and luxury experience over sustainability.
• Sustainability was seen as a "nice to have" rather than a key selling point for premium cosmetics.

Willingness to engage:
• Participants showed interest in sustainable options from premium brands if they didn't compromise on quality or luxury feel.
• However, convenience and hygiene concerns often outweighed sustainability considerations, especially for premium products.

Overall, the focus group didn't perceive significant differences in sustainability between premium and regular cosmetics. Sustainability wasn't seen as a defining feature of premium cosmetics, with participants focusing more on traditional luxury attributes. There's potential interest in sustainable premium options, but only if they maintain the expected quality and experience associated with high-end products.`

    setAnalysis(exampleAnalysis)
    setAnalysisHistory(prev => [...prev, searchQuery])
    setIsAnalyzing(false)
  }, 2000)
}

const getAgeGroup = (age: number) => {
  if (age < 30) return '25-29'
  if (age < 35) return '30-34'
  if (age < 40) return '35-39'
  return '40+'
}

const ageData = interviewData.speakersData.reduce((acc, speaker) => {
  const ageGroup = getAgeGroup(speaker.age)
  acc[ageGroup] = (acc[ageGroup] || 0) + 1
  return acc
}, {} as Record<string, number>)

const ageChartData = Object.entries(ageData).map(([name, value]) => ({ name, value }))

const genderData = interviewData.speakersData.reduce((acc, speaker) => {
  acc[speaker.gender] = (acc[speaker.gender] || 0) + 1
  return acc
}, {} as Record<string, number>)

const genderChartData = Object.entries(genderData).map(([name, value]) => ({ name, value }))

const familyStatusData = interviewData.speakersData.reduce((acc, speaker) => {
  acc[speaker.familyStatus] = (acc[speaker.familyStatus] || 0) + 1
  return acc
}, {} as Record<string, number>)

const familyStatusChartData = Object.entries(familyStatusData).map(([name, value]) => ({ name, value }))

const renderDonutChart = (data: { name: string; value: number }[], title: string) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <RechartsTooltip />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)


// useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (quoteFinderRef.current && !quoteFinderRef.current.contains(event.target)) {
//       setShowQuoteFinder(false)
//     }
//   }


//   document.addEventListener("mousedown", handleClickOutside)
//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside)
//   }
// }, [])

// Added for BUILD --above funtions is actual

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (quoteFinderRef.current && event.target instanceof Node && !quoteFinderRef.current.contains(event.target)) {
      setShowQuoteFinder(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


const handleTextSelection = () => {
  const selection = window.getSelection();
  if (selection && selection.toString().trim().length > 0) {
    setSelectedText(selection.toString().trim());
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    if (mainContentRef.current) {
      const mainRect = mainContentRef.current.getBoundingClientRect();
      setQuoteFinderPosition({
        x: rect.left - mainRect.left,
        y: rect.bottom - mainRect.top
      });
    } else {
      // Fallback position if mainContentRef.current is null
      setQuoteFinderPosition({
        x: rect.left,
        y: rect.bottom
      });
    }
  } else {
    setSelectedText("");
    setShowQuoteFinder(false);
  }
};

const handleFindQuotes = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setShowQuoteFinder(true);
};


return (
  <div className="flex h-screen bg-background">
    {/* Space for sidebar */}
    <div className="w-64 h-screen flex-shrink-0"></div>

    {/* Main content area */}
    <main className="flex-1 overflow-y-auto relative" onMouseUp={handleTextSelection} ref={mainContentRef}>
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <span>Projects</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>{interviewData.projectName}</span>
          </div>
          <h1 className="text-2xl font-bold">{interviewData.interviewName}</h1>
          <div className="flex flex-wrap gap-2 mt-1 text-sm">
            <p className="text-muted-foreground">
              Uploaded on: {new Date(interviewData.uploadDate).toLocaleDateString()}
            </p>
            <Badge variant="secondary">
              Analysis: {interviewData.analysisStatus}
            </Badge>
          </div>
        </div>
        <Tabs defaultValue="video-transcript" className="space-y-4">
          <TabsList className="flex w-full">
            {analysisTabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex-1 whitespace-nowrap">{tab.label} </TabsTrigger> 
            ))}
          </TabsList>
          <TabsContent value="video-transcript" className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
              <Card className="xl:col-span-3">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-t-md flex items-center justify-center">
                    <p className="text-white">Video Player Placeholder</p>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Sections</h3>
                    <ScrollArea className="h-[30vh] w-full rounded-md border">
                      {interviewData.interviewSections.map((section, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start py-2"
                          onClick={() => console.log(`Jump to ${section.time}`)}
                        >
                          <span className="mr-3 text-muted-foreground">{section.time}</span>
                          {section.title}
                        </Button>
                      ))}
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
              <Card className="xl:col-span-2 flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle>Transcript</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                  <ScrollArea className="h-full w-full rounded-md border p-4">
                    {interviewData.transcriptData.map((entry, index) => (
                      <div key={index} className="mb-4">
                        <div className="font-semibold">{entry.time} - {entry.speaker}</div>
                        <p>{entry.text}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="speakers">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {interviewData.speakersData.map((speaker, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={speaker.avatar} alt={speaker.name} />
                        <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{speaker.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{speaker.profession}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-1">Age: {speaker.age} | Gender: {speaker.gender} | Family: {speaker.familyStatus}</p>
                    <p className="text-sm">{speaker.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Separator className="my-8" />
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-center">Participant Demographics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {renderDonutChart(ageChartData, "Age Distribution")}
                {renderDonutChart(genderChartData, "Gender Distribution")}
                {renderDonutChart(familyStatusChartData, "Family Status")}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="concepts">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Concept Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 dark:bg-red-900"></div>
                  <span className="text-sm">Negative Opinion</span>
                  <div className="w-4 h-4 bg-white border dark:bg-gray-800 ml-4"></div>
                  <span className="text-sm">Positive Opinion</span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-lg">Concept</TableHead>
                      {interviewData.speakersData.map((speaker) => (
                        <TableHead key={speaker.name} className="text-center">
                          <div>{speaker.name}</div>
                          <div className="text-xs text-muted-foreground">{speaker.age}, {speaker.gender}</div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interviewData.conceptData.map((concept) => (
                      <TableRow key={concept.concept}>
                        <TableCell className="font-bold text-primary">{concept.concept}</TableCell>
                        {interviewData.speakersData.map((speaker) => {
                          const opinion = concept.opinions.find(o => o.speaker === speaker.name)
                          return (
                            <TableCell
                              key={`${concept.concept}-${speaker.name}`}
                              className={opinion?.sentiment === 'Negative' ? 'bg-red-100 dark:bg-red-900' : ''}
                            >
                              {opinion ? opinion.opinion : 'N/A'}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="custom-analysis" className="h-[calc(100vh-200px)]">
            <div className="flex h-full gap-6">
              {/* Left side: Settings */}
              <Card className="w-1/3 h-full overflow-auto">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Analysis Settings
                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <History className="h-4 w-4" />
                            <span className="sr-only">Analysis History</span>
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Analysis History</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                          {analysisHistory.length > 0 ? (
                            analysisHistory.map((topic, index) => (
                              <div key={index} className="mb-2 p-2 bg-muted rounded-md">
                                {topic}
                              </div>
                            ))
                          ) : (
                            <p className="text-center text-muted-foreground">No analysis history yet.</p>
                          )}
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="search-query" className="text-lg font-medium">What would you like to deep dive into?</Label>
                      <Input
                        id="search-query"
                        type="text"
                        placeholder="Enter your analysis query"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow"
                      />
                    </div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Label>Suggested Topics</Label>
                      <div className="space-y-2">
                        {suggestionTopics.map((topic, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="outline"
                              className={`w-full h-auto py-2 px-3 text-left whitespace-normal ${
                                selectedTopic === topic ? 'bg-primary text-primary-foreground' : ''
                              }`}
                              onClick={() => handleTopicClick(topic)}
                            >
                              <span className="text-xs">{topic}</span>
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    <div className="space-y-2">
                      <Label>Analysis Type</Label>
                      <RadioGroup
                        defaultValue="concise"
                        onValueChange={(value) => setAnalysisType(value)}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="concise" id="concise" />
                          <Label htmlFor="concise">Concise</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="comprehensive" id="comprehensive" />
                          <Label htmlFor="comprehensive">Comprehensive</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button onClick={handleAnalyze} disabled={!searchQuery || isAnalyzing} className="w-full">
                        {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* Right side: Analysis Results */}
              <Card className="w-2/3 h-full overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    Analysis Results
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Lightbulb className="h-4 w-4" />
                              <span className="sr-only">Analysis tips</span>
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Tip: Try combining multiple topics for a more comprehensive analysis</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)] pt-2">
                  <ScrollArea className="h-full w-full rounded-md border p-4">
                    <AnimatePresence mode="wait">
                      {analysis ? (
                        <motion.div
                          key="analysis"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="font-semibold mb-2">Analysis:</h3>
                          <p className="whitespace-pre-wrap">{analysis}</p>
                        </motion.div>
                      ) : (
                        <motion.p
                          key="placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-muted-foreground text-center mt-8"
                        >
                          Enter a query or select a suggested topic and click "Analyze" to see results.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="key-takeaways" className="h-[calc(100vh-200px)]">
            <Card className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">Key Takeaways</CardTitle>
                <p className="text-sm text-muted-foreground">Important insights and findings</p>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full w-full rounded-md border p-4">
                  <h3 className="font-semibold mb-2">Key Factors in Product Selection:</h3>
                  <Table className="w-3/4 mb-4 text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3">Factor</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Product-specific requirements</TableCell>
                        <TableCell>Varied needs per product type</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Price-performance ratio</TableCell>
                        <TableCell>Value for money</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Brand and recommendations</TableCell>
                        <TableCell>Reputation and peer influence</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Ingredients</TableCell>
                        <TableCell>Natural, vegan preferences</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Environmental impact</TableCell>
                        <TableCell>Sustainability concerns</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Packaging</TableCell>
                        <TableCell>Design importance varies by product</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h3 className="font-semibold mb-2">Luxury Cosmetics: Packaging vs. Functionality</h3>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>High-quality packaging expected for premium products</li>
                    <li>Functionality generally preferred over aesthetics</li>
                    <li>Issues with product accessibility noted</li>
                  </ul>
                  <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
                    "Es bringt mir nichts, wenn eine Handcreme schön aussieht, die Tube aber dumm gemacht ist und immer ein Rest in der Tube bleibt." (T9)
                  </blockquote>

                  <h3 className="font-semibold mb-2">Sustainability in Cosmetics</h3>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Growing importance in consumer choices</li>
                    <li>Challenges in identifying truly sustainable products</li>
                    <li>Mixed perceptions of sustainability in premium cosmetics</li>
                  </ul>
                  <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
                    "Ich glaube sie werden zumindest immer nachhaltiger. Das merkt man beispielsweise auch an der Verpackung." (T6)
                  </blockquote>

                  <h3 className="font-semibold mb-2">Changes in Premium Cosmetics Packaging</h3>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Thinner materials, increased use of green tones</li>
                    <li>Removal of cellophane, use of recycled plastic</li>
                    <li>Introduction of solid products with minimal packaging</li>
                  </ul>
                  <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
                    "Mir ist aufgefallen, dass bei der Farbe von Verpackungen immer mehr Grüntöne verwendet werden." (T6)
                  </blockquote>

                  <h3 className="font-semibold mb-2">Refillable Cosmetic Products</h3>
                  <Table className="w-full mb-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Aspect</TableHead>
                        <TableHead>Pros</TableHead>
                        <TableHead>Cons</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Consumer interest</TableCell>
                        <TableCell>Environmental benefits, cost savings</TableCell>
                        <TableCell>Hygiene concerns, practicality issues</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>At-home refills</TableCell>
                        <TableCell>Convenience</TableCell>
                        <TableCell>Cleaning concerns</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>In-store refills</TableCell>
                        <TableCell>Perceived sustainability</TableCell>
                        <TableCell>Timing and remnant challenges</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
                    "Ich glaube, dass die Wiederbefüllung im Geschäft mehr Vorteile bringt und sie ist nachhaltiger." (T7)
                  </blockquote>

                  <h3 className="font-semibold mb-2">Factors Influencing Refill Product Attractiveness</h3>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    <li>Ease of use and clear instructions</li>
                    <li>Competitive pricing</li>
                    <li>Clear sustainability benefits</li>
                    <li>Product differentiation (especially online)</li>
                  </ul>
                  <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
                    "Der Refillprozess muss einfach sein. Es muss schon beim Kauf des Originalproduktes intuitiv verständlich sein, wie der Refill funktioniert."
                  </blockquote>

                  <h3 className="font-semibold mb-2">Key Purchase Decision Factors</h3>
                  <p className="mb-2">Price and simplicity emerge as crucial factors.</p>
                  <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
                    "Eigentlich muss nur der Preis stimmen. Wenn das passt und es einfach ist (...) dann würde ich das schon kaufen."
                  </blockquote>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="deep-analysis">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Deep Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                      {analysisData.sections.map((section) => (
                        <button
                          key={section.title}
                          onClick={() => setActiveSection(section.title)}
                          className={`w-full text-left p-4 rounded-lg mb-2 transition-colors ${
                            activeSection === section.title
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{section.title}</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </button>
                      ))}
                    </ScrollArea>
                  </div>
                  <div className="w-full md:w-2/3">
                    <ScrollArea className="h-[calc(100vh-200px)]">
                      {analysisData.sections.map((section) => (
                        section.title === activeSection && (
                          <div key={section.title} className="space-y-6">
                            <h3 className="text-2xl font-semibold">{section.title}</h3>
                            <p className="text-lg text-muted-foreground">{section.content}</p>
                            {section.table && (
                              <div className="my-6">
                                <h4 className="text-xl font-semibold mb-4">{section.table.title}</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      {section.table.headers.map((header, index) => (
                                        <TableHead key={index}>{header}</TableHead>
                                      ))}
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {section.table.rows.map((row, index) => (
                                      <TableRow key={index}>
                                        {row.map((cell, cellIndex) => (
                                          <TableCell key={cellIndex}>{cell}</TableCell>
                                        ))}
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            )}
                            <div className="mt-6">
                              <h4 className="text-xl font-semibold mb-4">Quotes</h4>
                              {section.quotes.map((quote, index) => (
                                <blockquote key={index} className="border-l-4 border-primary pl-4 my-4">
                                  <p className="italic text-lg mb-2">"{quote.text}"</p>
                                  <footer className="text-right text-sm text-muted-foreground">- {quote.author}</footer>
                                </blockquote>
                              ))}
                            </div>
                          </div>
                        )
                      ))}
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="demographic-correlations">
          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">Demographic Correlations</CardTitle>
              <p className="text-sm text-muted-foreground">Insights based on demographic factors</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Demographic Profile</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Select onValueChange={setSelectedAge} defaultValue={selectedAge}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageGroups.map(age => (
                      <SelectItem key={age} value={age}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedGender} defaultValue={selectedGender}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map(gender => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedFamilyStatus} defaultValue={selectedFamilyStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select family status" />
                  </SelectTrigger>
                  <SelectContent>
                    {familyStatuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getRadarData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} />
                  <Radar name="Demographic Profile" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="insights">
            <ScrollArea className="h-[50vh] w-full rounded-md border p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Insights by Demographics</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Age Groups:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <span className="font-medium">25-35:</span>
                        <ul className="list-disc pl-5">
                          <li>More concerned about sustainability and eco-friendly packaging</li>
                          <li>Open to refillable options if convenient and cost-effective</li>
                          <li>Value aesthetics but willing to compromise for environmental benefits</li>
                          <li>Price-sensitive due to earlier career stages</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-medium">35-45:</span>
                        <ul className="list-disc pl-5">
                          <li>Balance between sustainability and practicality</li>
                          <li>Appreciate luxury feel but also consider environmental impact</li>
                          <li>More likely to pay premium for sustainable options if quality is maintained</li>
                          <li>Convenience is key due to busy lifestyles and family responsibilities</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-medium">45-55:</span>
                        <ul className="list-disc pl-5">
                          <li>Prioritize product efficacy and quality over sustainability</li>
                          <li>Prefer traditional packaging they're familiar with</li>
                          <li>Less likely to change habits for environmental reasons alone</li>
                          <li>Value brand reputation and luxury experience</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Gender:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <span className="font-medium">Males:</span>
                        <ul className="list-disc pl-5">
                          <li>Generally less concerned about packaging aesthetics</li>
                          <li>Focus more on functionality and effectiveness</li>
                          <li>Open to sustainable options if they don't compromise performance</li>
                          <li>Less brand loyal, more willing to try alternatives</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-medium">Females:</span>
                        <ul className="list-disc pl-5">
                          <li>Place higher importance on packaging aesthetics and brand image</li>
                          <li>More likely to engage with refillable concepts, especially for skincare</li>
                          <li>Concerned about hygiene aspects of refillable systems</li>
                          <li>Willing to put more effort into sustainable beauty routines</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Family Status:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <span className="font-medium">Single:</span>
                        <ul className="list-disc pl-5">
                          <li>More flexible in trying new sustainable packaging concepts</li>
                          <li>Less constrained by budget, may splurge on premium eco-friendly options</li>
                          <li>Value portability and travel-friendly packaging</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-medium">Married with Children:</span>
                        <ul className="list-disc pl-5">
                          <li>Prioritize safety and durability of packaging</li>
                          <li>Seek time-saving solutions, so convenience is crucial</li>
                          <li>More budget-conscious, need clear value proposition for sustainable options</li>
                          <li>Influenced by products' environmental impact on their children's future</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                </p>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
              </Tabs>
      </div>

      {selectedText && (
        <Popover open={showQuoteFinder} onOpenChange={setShowQuoteFinder}>
          <PopoverTrigger asChild>
            <div
              className="absolute"
              style={{
                left: `${quoteFinderPosition.x}px`,
                top: `${quoteFinderPosition.y}px`,
              }}
            >
              <Button onClick={handleFindQuotes}>
                <Search className="mr-2 h-4 w-4" /> Find Quotes
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80" ref={quoteFinderRef}>
            <QuoteFinder onClose={() => setShowQuoteFinder(false)} selectedText={selectedText} />
          </PopoverContent>
        </Popover>
      )}
    </main>
  </div>
)
}