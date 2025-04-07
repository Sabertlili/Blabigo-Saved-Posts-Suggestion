import React, { useState, useEffect, useRef } from 'react';
import { X, Tag, Filter, Plus, Search, ZoomIn, ZoomOut, Maximize2, Edit, Save, Trash2, Move, Layout, Check, XCircle, Settings, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const LinkedInCompleteOrganizer = () => {
  // Demo tag categories with colors
  const [tagCategories, setTagCategories] = useState([
    { id: 1, name: 'Industry News', color: 'bg-blue-500', textColor: 'text-white', position: { x: 0, y: 0 } },
    { id: 2, name: 'Learning Resources', color: 'bg-green-500', textColor: 'text-white', position: { x: 1, y: 0 } },
    { id: 3, name: 'Job Opportunities', color: 'bg-purple-500', textColor: 'text-white', position: { x: 0, y: 1 } },
    { id: 4, name: 'Networking', color: 'bg-yellow-500', textColor: 'text-black', position: { x: 1, y: 1 } },
    { id: 5, name: 'Events', color: 'bg-orange-500', textColor: 'text-white', position: { x: 0, y: 2 } },
    { id: 6, name: 'Inspiration', color: 'bg-pink-500', textColor: 'text-white', position: { x: 1, y: 2 } },
  ]);

  // Available colors for the color picker
  const colorOptions = [
    { name: 'Blue', bgClass: 'bg-blue-500', textClass: 'text-white' },
    { name: 'Green', bgClass: 'bg-green-500', textClass: 'text-white' },
    { name: 'Purple', bgClass: 'bg-purple-500', textClass: 'text-white' },
    { name: 'Yellow', bgClass: 'bg-yellow-500', textClass: 'text-black' },
    { name: 'Orange', bgClass: 'bg-orange-500', textClass: 'text-white' },
    { name: 'Pink', bgClass: 'bg-pink-500', textClass: 'text-white' },
    { name: 'Red', bgClass: 'bg-red-500', textClass: 'text-white' },
    { name: 'Indigo', bgClass: 'bg-indigo-500', textClass: 'text-white' },
    { name: 'Teal', bgClass: 'bg-teal-500', textClass: 'text-white' },
    { name: 'Emerald', bgClass: 'bg-emerald-500', textClass: 'text-white' },
    { name: 'Amber', bgClass: 'bg-amber-500', textClass: 'text-black' },
    { name: 'Lime', bgClass: 'bg-lime-500', textClass: 'text-black' },
  ];

  // Demo posts with tags
  const [allPosts, setAllPosts] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      role: 'Product Manager at TechCorp',
      date: '2d ago',
      content: 'Just published our annual tech trends report! AI and machine learning continue to dominate the conversation, but we\'re seeing increased focus on edge computing and decentralized systems. Download the full report in the comments.',
      likes: 243,
      comments: 52,
      shares: 18,
      image: 'tech-report',
      tags: [1], // Each post has a single tag for spatial view compatibility
      buttons: ['orange', 'blue']
    },
    {
      id: 2,
      author: 'David Chen',
      role: 'Software Engineer at DevTools',
      date: '1w ago',
      content: 'Free webinar next Thursday on "Advanced React Patterns" - we\'ll cover render props, compound components, and the latest hooks. Limited spots available, register with the link below!',
      likes: 112,
      comments: 24,
      shares: 7,
      tags: [2],
      buttons: ['green', 'blue']
    },
    {
      id: 3,
      author: 'TechStartups Weekly',
      role: 'Tech News Publication',
      date: '3d ago',
      content: 'Breaking: Major funding round announced for AI startup DeepMind Labs. The $75M Series B will accelerate their research into generative video models and multimodal learning systems.',
      likes: 432,
      comments: 87,
      shares: 101,
      tags: [1],
      buttons: ['blue']
    },
    {
      id: 4,
      author: 'Talent Recruiters Network',
      role: 'Recruiting Agency',
      date: '5h ago',
      content: 'HOT JOB ALERT: Senior Product Designer needed for fast-growing fintech. Remote-friendly, competitive salary, great benefits. 5+ years experience required. DM for details or apply with link below.',
      likes: 53,
      comments: 12,
      shares: 31,
      tags: [3],
      buttons: ['purple']
    },
    {
      id: 5,
      author: 'Michelle Rodriguez',
      role: 'UX Research Lead at DesignFirst',
      date: '2w ago',
      content: 'Just published my new course on Mastering User Interviews! Learn how to extract meaningful insights and avoid common biases. Use code LINKEDIN20 for 20% off until end of month.',
      likes: 187,
      comments: 34,
      shares: 22,
      image: 'course-cover',
      tags: [2],
      buttons: ['green', 'pink']
    },
    {
      id: 6,
      author: 'Tech Conference Global',
      role: 'Event Organization',
      date: '1d ago',
      content: 'Announcing our speaker lineup for DevCon 2025! Featuring industry leaders from Google, Microsoft, and exciting startups. Early bird tickets available for the next 48 hours.',
      likes: 312,
      comments: 47,
      shares: 89,
      tags: [5],
      buttons: ['orange', 'blue']
    },
    {
      id: 7,
      author: 'Alex Thompson',
      role: 'Engineering Director at CloudScale',
      date: '3d ago',
      content: 'Looking to expand our backend team with experienced Go developers. We\'re building high-performance distributed systems for enterprise clients. Fully remote, competitive compensation package.',
      likes: 97,
      comments: 43,
      shares: 12,
      tags: [3],
      buttons: ['purple', 'green']
    },
    {
      id: 8,
      author: 'Jessica Williams',
      role: 'Data Science Manager',
      date: '4d ago',
      content: 'Just finished the Advanced ML certification - highly recommend for anyone looking to level up their machine learning skills. The section on reinforcement learning was particularly valuable.',
      likes: 146,
      comments: 19,
      shares: 8,
      tags: [2],
      buttons: ['green']
    },
    {
      id: 9,
      author: 'Ryan Martinez',
      role: 'VP of Marketing at GrowthHackers',
      date: '6h ago',
      content: 'Excited to announce I\'ll be speaking at the Digital Marketing Summit next month. My talk: "Content Distribution Strategies That Actually Work" - hope to see some of you there!',
      likes: 215,
      comments: 37,
      shares: 15,
      tags: [4],
      buttons: ['yellow', 'orange']
    },
    {
      id: 10,
      author: 'TechInsider',
      role: 'Technology News Platform',
      date: '1d ago',
      content: 'BREAKING: Major security vulnerability discovered in popular framework. Update your dependencies immediately. Full details and mitigation steps in the linked article.',
      likes: 578,
      comments: 134,
      shares: 245,
      tags: [1],
      buttons: ['blue', 'red']
    },
    {
      id: 11,
      author: 'Dr. Emma Chen',
      role: 'AI Research Scientist',
      date: '2w ago',
      content: 'Just published our paper on transformer architecture improvements. We achieved 15% better performance with 30% fewer parameters. Link to the paper and code in comments!',
      likes: 423,
      comments: 56,
      shares: 102,
      tags: [2],
      buttons: ['green', 'blue']
    },
    {
      id: 12,
      author: 'Startup Accelerator Program',
      role: 'Tech Incubator',
      date: '3d ago',
      content: 'Applications now open for our Fall 2025 cohort! We provide funding, mentorship, and connections to promising early-stage startups. Deadline in 2 weeks.',
      likes: 89,
      comments: 14,
      shares: 31,
      tags: [3],
      buttons: ['purple', 'yellow']
    },
  ]);

  // State for tag editing
  const [tagBeingEdited, setTagBeingEdited] = useState(null);
  const [editedTagName, setEditedTagName] = useState("");
  const [editedTagColor, setEditedTagColor] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [nextTagId, setNextTagId] = useState(7); // For creating new tags

  // State for tag section dragging
  const [isDraggingSection, setIsDraggingSection] = useState(false);
  const [draggedSection, setDraggedSection] = useState(null);

  // State for main interface
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [currentView, setCurrentView] = useState('grid'); // 'grid', 'list', or 'spatial'
  
  // State for spatial view
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPost, setDraggedPost] = useState(null);
  const [postPositions, setPostPositions] = useState({});
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startPan, setStartPan] = useState(null);
  const [activeTagId, setActiveTagId] = useState(null); // For tag context menu
  const [showNewTagForm, setShowNewTagForm] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(colorOptions[0].bgClass);
  const [newTagTextColor, setNewTagTextColor] = useState(colorOptions[0].textClass);
  const [collapsedSections, setCollapsedSections] = useState([]);
  const [isLayoutEditing, setIsLayoutEditing] = useState(false);

  // References
  const tagNameInputRef = useRef(null);
  const newTagInputRef = useRef(null);

  // Filter posts based on selected tags and search term
  const filterPosts = () => {
    let filtered = [...allPosts];
    
    // Filter by tags if any are selected
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        selectedTags.some(tagId => post.tags.includes(tagId))
      );
    }
    
    // Filter by search term if present
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(term) || 
        post.author.toLowerCase().includes(term)
      );
    }
    
    setFilteredPosts(filtered);
  };

  // Toggle tag selection
  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Effect to filter posts when tags or search changes
  useEffect(() => {
    filterPosts();
  }, [selectedTags, searchTerm, allPosts]);

  // Get tag object by ID
  const getTagById = (tagId) => {
    return tagCategories.find(tag => tag.id === tagId);
  };
  
  // Initialize random positions for posts within their tag sections
  useEffect(() => {
    if (Object.keys(postPositions).length === 0) {
      const initialPositions = {};
      
      // Group posts by tag to better distribute them
      const postsByTag = {};
      allPosts.forEach(post => {
        const tagId = post.tags[0];
        if (!postsByTag[tagId]) {
          postsByTag[tagId] = [];
        }
        postsByTag[tagId].push(post);
      });
      
      // Distribute posts in each tag section in a grid-like pattern
      Object.entries(postsByTag).forEach(([tagId, posts]) => {
        const numCols = 3; // Number of columns in our virtual grid
        posts.forEach((post, index) => {
          const col = index % numCols;
          const row = Math.floor(index / numCols);
          
          // Calculate position based on grid position
          const x = 20 + col * 120;
          const y = 20 + row * 120;
          
          // Add slight randomization for visual interest
          const randomRotation = (Math.random() - 0.5) * 6;
          const randomX = x + (Math.random() - 0.5) * 10;
          const randomY = y + (Math.random() - 0.5) * 10;
          
          initialPositions[post.id] = {
            x: randomX,
            y: randomY,
            rotation: randomRotation
          };
        });
      });
      
      setPostPositions(initialPositions);
    }
  }, [allPosts]);

  // Handle starting to drag a post in spatial view
  const handlePostDragStart = (e, post) => {
    e.stopPropagation();
    setIsDragging(true);
    setDraggedPost({
      post,
      startX: e.clientX,
      startY: e.clientY,
      originalX: postPositions[post.id]?.x || 0,
      originalY: postPositions[post.id]?.y || 0
    });
  };

  // Handle starting to drag a tag section in spatial view
  const handleSectionDragStart = (e, tagId) => {
    if (!isLayoutEditing) return;
    
    e.stopPropagation();
    const tag = getTagById(tagId);
    setIsDraggingSection(true);
    setDraggedSection({
      tagId,
      startX: e.clientX,
      startY: e.clientY,
      originalX: tag.position.x,
      originalY: tag.position.y
    });
  };

  // Handle mouse movement during drag in spatial view
  const handleMouseMove = (e) => {
    if (isDragging && draggedPost) {
      // Update post position during drag
      const dx = (e.clientX - draggedPost.startX) / scale;
      const dy = (e.clientY - draggedPost.startY) / scale;
      
      setPostPositions(prev => ({
        ...prev,
        [draggedPost.post.id]: {
          ...prev[draggedPost.post.id],
          x: draggedPost.originalX + dx,
          y: draggedPost.originalY + dy,
          isDragging: true
        }
      }));
    } else if (isDraggingSection && draggedSection) {
      // Handle section dragging in editing mode
      e.preventDefault();
      
      const moveX = Math.round((e.clientX - draggedSection.startX) / 350);
      const moveY = Math.round((e.clientY - draggedSection.startY) / 350);
      
      if (moveX !== 0 || moveY !== 0) {
        const newX = Math.max(0, Math.min(1, draggedSection.originalX + moveX));
        const newY = Math.max(0, Math.min(2, draggedSection.originalY + moveY));
        
        setTagCategories(prev => prev.map(tag => 
          tag.id === draggedSection.tagId 
            ? { ...tag, position: { x: newX, y: newY } }
            : tag
        ));
        
        setDraggedSection({
          ...draggedSection,
          startX: e.clientX,
          startY: e.clientY,
          originalX: newX,
          originalY: newY
        });
      }
    } else if (startPan) {
      // Handle canvas panning
      setOffset({
        x: offset.x + (e.clientX - startPan.x) / scale,
        y: offset.y + (e.clientY - startPan.y) / scale
      });
      setStartPan({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle drop of post in spatial view
  const handleMouseUp = (e) => {
    if (isDragging && draggedPost) {
      // Check which tag section the post was dropped in
      const tagSections = document.querySelectorAll('.tag-section');
      let newTagId = null;
      
      tagSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        if (mouseX >= rect.left && mouseX <= rect.right && 
            mouseY >= rect.top && mouseY <= rect.bottom) {
          newTagId = parseInt(section.dataset.tagId);
        }
      });
      
      if (newTagId && newTagId !== draggedPost.post.tags[0]) {
        // Calculate relative position within new section
        const newSection = document.querySelector(`.tag-section[data-tag-id="${newTagId}"]`);
        const newSectionRect = newSection.getBoundingClientRect();
        
        // Calculate position within the section relative to mouse position
        const relativeX = (e.clientX - newSectionRect.left) / scale;
        const relativeY = (e.clientY - newSectionRect.top) / scale;
        
        // Update the post's position for the new section
        setPostPositions(prev => ({
          ...prev,
          [draggedPost.post.id]: {
            ...prev[draggedPost.post.id],
            x: relativeX - 130, // Adjust for post width/height to center at cursor
            y: relativeY - 70,
            isDragging: false
          }
        }));
        
        // Update the post's tag - replace the old tag with the new tag
        setAllPosts(prev => prev.map(p => 
          p.id === draggedPost.post.id 
            ? { ...p, tags: [newTagId] } // Completely replace the tags array with just the new tag
            : p
        ));
        
        // Highlight the tag section briefly for visual feedback
        if (newSection) {
          newSection.classList.add('highlight-section');
          setTimeout(() => {
            newSection.classList.remove('highlight-section');
          }, 300);
        }
      } else {
        // Just remove dragging state if not changing tags
        setPostPositions(prev => ({
          ...prev,
          [draggedPost.post.id]: {
            ...prev[draggedPost.post.id],
            isDragging: false
          }
        }));
      }
    }
    
    setIsDragging(false);
    setDraggedPost(null);
    setIsDraggingSection(false);
    setDraggedSection(null);
    setStartPan(null);
  };

  // Start canvas panning in spatial view
  const handleCanvasMouseDown = (e) => {
    if (e.button === 0 && !isDragging && !isDraggingSection) { // Left mouse button, not dragging
      setStartPan({ x: e.clientX, y: e.clientY });
    }
  };

  // Zoom controls for spatial view
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  // Begin editing a tag
  const startEditingTag = (tagId) => {
    const tag = getTagById(tagId);
    setTagBeingEdited(tagId);
    setEditedTagName(tag.name);
    setEditedTagColor(tag.color);
    setActiveTagId(null); // Close the context menu
    
    // Focus the input after rendering
    setTimeout(() => {
      if (tagNameInputRef.current) {
        tagNameInputRef.current.focus();
      }
    }, 10);
  };

  // Save tag edits
  const saveTagEdits = () => {
    if (editedTagName.trim() === '') return;
    
    setTagCategories(prev => prev.map(tag => 
      tag.id === tagBeingEdited
        ? { 
            ...tag, 
            name: editedTagName,
            color: editedTagColor,
            textColor: getTextColorForBg(editedTagColor)
          }
        : tag
    ));
    
    setTagBeingEdited(null);
    setShowColorPicker(false);
  };

  // Cancel tag editing
  const cancelTagEditing = () => {
    setTagBeingEdited(null);
    setShowColorPicker(false);
  };

  // Delete a tag
  const deleteTag = (tagId) => {
    setActiveTagId(null); // Close the context menu
    
    // Get posts with this tag
    const postsWithTag = allPosts.filter(post => post.tags.includes(tagId));
    
    if (postsWithTag.length > 0) {
      if (!window.confirm(`This tag has ${postsWithTag.length} posts. Are you sure you want to delete it? Posts will be moved to "Untagged".`)) {
        return;
      }
      
      // Move posts to "Untagged" or first available tag
      const firstTagId = tagCategories.find(t => t.id !== tagId)?.id || 0;
      
      setAllPosts(prev => prev.map(post => 
        post.tags.includes(tagId)
          ? { ...post, tags: [firstTagId] }
          : post
      ));
    }
    
    // Remove the tag
    setTagCategories(prev => prev.filter(tag => tag.id !== tagId));
    
    // Update selected tags if needed
    if (selectedTags.includes(tagId)) {
      setSelectedTags(prev => prev.filter(id => id !== tagId));
    }
  };

  // Create a new tag
  const createNewTag = () => {
    if (newTagName.trim() === '') return;
    
    const newTag = {
      id: nextTagId,
      name: newTagName,
      color: newTagColor,
      textColor: newTagTextColor,
      position: { x: nextTagId % 2, y: Math.floor(tagCategories.length / 2) }
    };
    
    setTagCategories(prev => [...prev, newTag]);
    setNextTagId(nextTagId + 1);
    setShowNewTagForm(false);
    setNewTagName('');
    setNewTagColor(colorOptions[0].bgClass);
    setNewTagTextColor(colorOptions[0].textClass);
  };

  // Toggle tag section collapse
  const toggleSectionCollapse = (tagId) => {
    if (collapsedSections.includes(tagId)) {
      setCollapsedSections(prev => prev.filter(id => id !== tagId));
    } else {
      setCollapsedSections(prev => [...prev, tagId]);
    }
  };

  // Get button color class
  const getButtonColorClass = (color) => {
    switch(color) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'purple': return 'bg-purple-500';
      case 'yellow': return 'bg-yellow-500';
      case 'orange': return 'bg-orange-500';
      case 'pink': return 'bg-pink-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Get text color for a background color
  const getTextColorForBg = (bgColor) => {
    const lightColors = ['bg-yellow-500', 'bg-lime-500', 'bg-amber-500'];
    return lightColors.includes(bgColor) ? 'text-black' : 'text-white';
  };

  // Reset tag layout to default grid
  const resetTagLayout = () => {
    setTagCategories(prev => prev.map((tag, index) => ({
      ...tag,
      position: { x: index % 2, y: Math.floor(index / 2) }
    })));
  };

  // Add styles for the highlight effect in spatial view
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes highlight {
        0% { box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4); }
        50% { box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.6); }
        100% { box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4); }
      }
      .highlight-section {
        animation: highlight 0.3s ease-in-out;
      }
      .dragging {
        opacity: 0.8;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }
      .tag-section {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .section-dragging {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 100;
      }
      .layout-edit-mode .tag-section:hover {
        box-shadow: 0 0 0 2px #3b82f6;
      }
      .layout-edit-mode .section-header {
        cursor: move;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-6">LinkedIn Saves</h1>
        
        {/* Search Box */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search saved posts..."
            className="w-full p-2 pl-8 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        {/* Filter Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <h2 className="font-semibold">Filter by Tags</h2>
            </div>
            {showNewTagForm ? (
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewTagForm(false)}
              >
                <XCircle className="h-4 w-4" />
              </button>
            ) : (
              <button 
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  setShowNewTagForm(true);
                  setTimeout(() => {
                    if (newTagInputRef.current) {
                      newTagInputRef.current.focus();
                    }
                  }, 10);
                }}
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* New Tag Form */}
          {showNewTagForm && (
            <div className="mb-4 p-3 bg-gray-50 rounded-md">
              <div className="mb-2">
                <input
                  ref={newTagInputRef}
                  type="text"
                  placeholder="Tag name"
                  className="w-full p-2 border rounded-md mb-2"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {colorOptions.map(option => (
                    <div 
                      key={option.bgClass}
                      className={`w-6 h-6 rounded-full ${option.bgClass} cursor-pointer transition-transform ${newTagColor === option.bgClass ? 'ring-2 ring-blue-500 scale-110' : ''}`}
                      onClick={() => {
                        setNewTagColor(option.bgClass);
                        setNewTagTextColor(option.textClass);
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="flex justify-end gap-2 mt-2">
                  <button 
                    className="px-3 py-1 bg-gray-200 rounded-md text-sm"
                    onClick={() => setShowNewTagForm(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                    onClick={createNewTag}
                  >
                    Create Tag
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Tag List */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {tagCategories.map(tag => (
              <div 
                key={tag.id} 
                className={`flex items-center p-2 rounded-md cursor-pointer ${selectedTags.includes(tag.id) ? 'bg-gray-100' : ''}`}
                onClick={() => toggleTag(tag.id)}
              >
                <div className={`w-3 h-3 rounded-full ${tag.color} mr-2`}></div>
                <span className="flex-1 truncate">{tag.name}</span>
                {selectedTags.includes(tag.id) && (
                  <X className="h-4 w-4 ml-1 text-gray-500" />
                )}
                <button 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditingTag(tag.id);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {selectedTags.length > 0 
                ? `Filtered Posts (${filteredPosts.length})` 
                : `All Saved Posts (${filteredPosts.length})`}
            </h2>
            
            {/* View Options */}
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 border rounded-md text-sm ${currentView === 'grid' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-white'}`}
                onClick={() => setCurrentView('grid')}
              >
                Grid View
              </button>
              <button 
                className={`px-3 py-1 border rounded-md text-sm ${currentView === 'list' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-white'}`}
                onClick={() => setCurrentView('list')}
              >
                List View
              </button>
              <button 
                className={`px-3 py-1 border rounded-md text-sm ${currentView === 'spatial' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-white'}`}
                onClick={() => setCurrentView('spatial')}
              >
                Spatial View
              </button>
            </div>
          </div>
        </div>
        
        {/* View Content */}
        <div className="flex-1 overflow-auto relative">
          {/* Grid View */}
          {currentView === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                  {/* Post Header */}
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                      <h3 className="font-semibold">{post.author}</h3>
                      <p className="text-xs text-gray-500">{post.role} • {post.date}</p>
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <p className="mb-3 text-sm">{post.content}</p>
                  
                  {/* Post Image (if any) */}
                  {post.image && (
                    <div className="w-full h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-400">
                      {post.image === 'tech-report' ? 'Tech Trends Report Image' : 'Course Cover Image'}
                    </div>
                  )}
                  
                  {/* Post Stats */}
                  <div className="flex text-xs text-gray-500 mb-3">
                    <span className="mr-3">{post.likes} likes</span>
                    <span className="mr-3">{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tagId => {
                      const tag = getTagById(tagId);
                      return tag ? (
                        <div key={tagId} className="flex items-center rounded-full px-2 py-1 text-xs bg-gray-100">
                          <div className={`w-2 h-2 rounded-full ${tag.color} mr-1`}></div>
                          <span>{tag.name}</span>
                        </div>
                      ) : null;
                    })}
                    
                    {/* Add Tag Button */}
                    <div className="flex items-center rounded-full px-2 py-1 text-xs border border-dashed border-gray-300 text-gray-400 cursor-pointer">
                      <Plus className="h-3 w-3 mr-1" />
                      <span>Add Tag</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* List View */}
          {currentView === 'list' && (
            <div className="space-y-4 p-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                  {/* Post Header */}
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{post.author}</h3>
                          <p className="text-xs text-gray-500">{post.role} • {post.date}</p>
                        </div>
                        {/* Tags */}
                        <div className="flex gap-2">
                          {post.tags.map(tagId => {
                            const tag = getTagById(tagId);
                            return tag ? (
                              <div key={tagId} className="flex items-center rounded-full px-2 py-1 text-xs bg-gray-100">
                                <div className={`w-2 h-2 rounded-full ${tag.color} mr-1`}></div>
                                <span>{tag.name}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Post Content */}
                  <p className="mb-3 text-sm">{post.content}</p>
                  
                  {/* Post Image (if any) */}
                  {post.image && (
                    <div className="w-full h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-400">
                      {post.image === 'tech-report' ? 'Tech Trends Report Image' : 'Course Cover Image'}
                    </div>
                  )}
                  
                  {/* Post Stats and Action Button */}
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex text-gray-500">
                      <span className="mr-3">{post.likes} likes</span>
                      <span className="mr-3">{post.comments} comments</span>
                      <span>{post.shares} shares</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {post.buttons && post.buttons.map((color, idx) => (
                        <div key={idx} className={`${getButtonColorClass(color)} h-6 rounded-full px-3 text-white text-xs flex items-center`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Spatial View */}
          {currentView === 'spatial' && (
            <div className="h-full relative">
              {/* Toolbar */}
              <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md z-50 flex gap-2">
                <button 
                  onClick={() => setIsLayoutEditing(!isLayoutEditing)} 
                  className={`p-1 rounded ${isLayoutEditing ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                  title={isLayoutEditing ? "Exit Layout Editing" : "Edit Layout"}
                >
                  <Layout className="h-5 w-5" />
                </button>
                {isLayoutEditing && (
                  <button 
                    onClick={resetTagLayout} 
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Reset Layout"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </button>
                )}
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button onClick={handleZoomIn} className="p-1 hover:bg-gray-100 rounded" title="Zoom In">
                  <ZoomIn className="h-5 w-5" />
                </button>
                <button onClick={handleZoomOut} className="p-1 hover:bg-gray-100 rounded" title="Zoom Out">
                  <ZoomOut className="h-5 w-5" />
                </button>
                <button onClick={handleResetView} className="p-1 hover:bg-gray-100 rounded" title="Reset View">
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>
              
              {/* Instructions */}
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md z-50 text-sm max-w-xs opacity-75 hover:opacity-100 transition-opacity">
                <p className="font-medium mb-1">Spatial View</p>
                <p>• Drag posts between tag sections to change tags</p>
                <p>• Posts inherit the tag of their new section</p>
                <p>• Click <Layout className="inline h-4 w-4" /> to edit tag layout</p>
                <p>• Click <Settings className="inline h-4 w-4" /> to edit tag name/color</p>
                <p>• Toggle <ChevronDown className="inline h-4 w-4" /> to collapse sections</p>
              </div>
              
              {/* Tag being edited overlay */}
              {tagBeingEdited !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
                    <h3 className="text-lg font-bold mb-4">Edit Tag</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Tag Name</label>
                      <input
                        ref={tagNameInputRef}
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={editedTagName}
                        onChange={(e) => setEditedTagName(e.target.value)}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1">Tag Color</label>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map(option => (
                          <div 
                            key={option.bgClass}
                            className={`w-8 h-8 rounded-full ${option.bgClass} cursor-pointer transition-transform ${editedTagColor === option.bgClass ? 'ring-2 ring-blue-500 scale-110' : ''}`}
                            onClick={() => setEditedTagColor(option.bgClass)}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={cancelTagEditing} 
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => deleteTag(tagBeingEdited)} 
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={saveTagEdits} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Canvas with drag event handling */}
              <div 
                className={`w-full h-full cursor-move ${isLayoutEditing ? 'layout-edit-mode' : ''}`}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Canvas with transformations */}
                <div 
                  className="absolute inset-0"
                  style={{
                    transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
                    transformOrigin: '0 0'
                  }}
                >
                  {/* Tag Sections */}
                  {tagCategories.map(tag => {
                    const isCollapsed = collapsedSections.includes(tag.id);
                    const sectionStyle = {
                      gridColumnStart: tag.position.x + 1,
                      gridRowStart: tag.position.y + 1,
                      backgroundColor: tag.color === 'bg-blue-500' ? '#EBF5FF' :
                                       tag.color === 'bg-green-500' ? '#E6FFEE' :
                                       tag.color === 'bg-purple-500' ? '#F5EBFF' :
                                       tag.color === 'bg-yellow-500' ? '#FFFDE6' :
                                       tag.color === 'bg-orange-500' ? '#FFF1E6' :
                                       tag.color === 'bg-pink-500' ? '#FEE6EF' : 
                                       tag.color === 'bg-red-500' ? '#FEE6E6' :
                                       tag.color === 'bg-indigo-500' ? '#EEE6FF' :
                                       tag.color === 'bg-teal-500' ? '#E6FFFA' :
                                       tag.color === 'bg-emerald-500' ? '#E6FFF4' :
                                       tag.color === 'bg-amber-500' ? '#FFF9E6' :
                                       tag.color === 'bg-lime-500' ? '#F4FFE6' : '#FFFFFF'
                    };
                    
                    const isDraggingThisSection = isDraggingSection && draggedSection && draggedSection.tagId === tag.id;
                    
                    return (
                      <div 
                        key={tag.id}
                        className={`tag-section rounded-lg border-2 border-gray-200 shadow-md absolute ${
                          isDraggingThisSection ? 'section-dragging' : ''
                        } ${isCollapsed ? 'h-14' : ''}`}
                        style={{
                          ...sectionStyle,
                          left: tag.position.x * 450 + 30,
                          top: tag.position.y * 450 + 30,
                          width: '400px',
                          minHeight: isCollapsed ? 'auto' : '380px'
                        }}
                        data-tag-id={tag.id}
                      >
                        {/* Tag Header */}
                        <div 
                          className={`section-header flex items-center justify-between px-3 py-2 rounded-t-md ${tag.color} ${tag.textColor}`}
                          onMouseDown={(e) => handleSectionDragStart(e, tag.id)}
                        >
                          <div className="flex items-center">
                            {isLayoutEditing && (
                              <Move className="h-4 w-4 mr-2 cursor-move" />
                            )}
                            <h3 className="font-semibold">{tag.name}</h3>
                          </div>
                          <div className="flex items-center">
                            <button
                              className={`p-1 mr-1 rounded-full hover:bg-white hover:bg-opacity-20 ${tag.textColor}`}
                              onClick={() => startEditingTag(tag.id)}
                              title="Edit Tag"
                            >
                              <Settings className="h-4 w-4" />
                            </button>
                            <button
                              className={`p-1 rounded-full hover:bg-white hover:bg-opacity-20 ${tag.textColor}`}
                              onClick={() => toggleSectionCollapse(tag.id)}
                              title={isCollapsed ? "Expand Section" : "Collapse Section"}
                            >
                              {isCollapsed ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronUp className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        
                        {/* Posts container - hidden when collapsed */}
                        {!isCollapsed && (
                          <div className="p-3 relative" style={{ minHeight: '345px' }}>
                            {/* Posts belonging to this tag */}
                            {filteredPosts
                              .filter(post => post.tags.includes(tag.id))
                              .map(post => {
                                const position = postPositions[post.id] || { x: 50, y: 50, rotation: 0 };
                                const isDraggingThisPost = position.isDragging;
                                
                                return (
                                  <div 
                                    key={post.id}
                                    className={`absolute bg-white rounded-lg shadow-md p-3 w-64 cursor-grab active:cursor-grabbing hover:shadow-lg ${isDraggingThisPost ? 'dragging' : ''}`}
                                    style={{
                                      left: position.x,
                                      top: position.y,
                                      transform: `rotate(${position.rotation}deg)`,
                                      zIndex: isDraggingThisPost ? 50 : 10,
                                      width: '250px'
                                    }}
                                    onMouseDown={(e) => handlePostDragStart(e, post)}
                                  >
                                    {/* Post Header */}
                                    <div className="flex items-start mb-2">
                                      <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex-shrink-0"></div>
                                      <div className="overflow-hidden">
                                        <h3 className="font-semibold text-sm truncate">{post.author}</h3>
                                        <p className="text-xs text-gray-500 truncate">{post.role} • {post.date}</p>
                                      </div>
                                    </div>
                                    
                                    {/* Post Content */}
                                    <p className="mb-3 text-xs line-clamp-3">{post.content}</p>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-1">
                                      {post.buttons && post.buttons.map((color, index) => (
                                        <div 
                                          key={index} 
                                          className={`${getButtonColorClass(color)} h-5 rounded-full px-3 text-white text-xs flex items-center`}
                                        ></div>
                                      ))}
                                    </div>
                                    
                                    {/* Single Tag Indicator */}
                                    <div className="mt-2">
                                      <div className={`${tag.color} ${tag.textColor} rounded-full px-2 py-0.5 text-xs inline-flex items-center`}>
                                        <span>{tag.name}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                              
                              {/* Empty state message */}
                              {filteredPosts.filter(post => post.tags.includes(tag.id)).length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm p-4 text-center">
                                  <div>
                                    <p>No posts with this tag</p>
                                    <p className="text-xs mt-1">Drag posts here to add them</p>
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedInCompleteOrganizer;