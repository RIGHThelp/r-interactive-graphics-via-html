## Functions used to manage head section of the HTML file:

## ---
## Functions to keep track of sourcing scripts:
## ---

# Function to keep track of sourcing scripts. This function has side effects:
addSource <- function(newSource = NULL) {
  
  if (!is.null(newSource)) {
    
    if (!is.character(newSource)) {
      stop("newSource should be a character vector.") 
    } # if
    
    .RIGHT$sourceArray <- append(.RIGHT$sourceArray, newSource) 
    
  } # if
  
  invisible()
  
} # function addSource

# Function to create lines to source other scripts given a character array:
createSource <- function(sourceArray = NULL) {

  # Print out nothing if nothing is given:
  if (is.null(sourceArray)) {
    return(NULL)
  } # if 
  
  # Source scripts only once:
  sourceArray <- unique(sourceArray)
  
  # Remove empty strings:
  sourceArray <- sourceArray[sourceArray != ""]
  
  if(!.RIGHT$flagServer) 
    sourceArray <- paste(.RIGHT$libDir_RIGHT, sourceArray, sep="/")
  else
    sourceArray <- paste("Javascript/", sourceArray, sep="")
  
  sourceArray <- append(sourceArray, "data.js")
  
  return(paste0('<script src="', sourceArray, '" type="text/javascript"></script>'))
  
} # createSource

## ---
## Functions to keep track of links:
##
## See sourcing functions for comments.
## ---

addLink <- function(newLink = NULL) {
  
  if (!is.null(newLink)) {
    
    if (!is.character(newLink)) {
      stop("newLink should be a character vector.") 
    } # if
    
    .RIGHT$linkArray <- append(.RIGHT$linkArray, newLink) 
    
  } # if
  
  invisible()
  
} # function addLink

createLink <- function(linkArray = NULL) {
    
  if (is.null(linkArray)) {
    return(NULL)
  } # if 

  linkArray <- unique(linkArray)
  linkArray <- linkArray[linkArray != ""]
      
  if(!.RIGHT$flagServer) {
    for(iData in 1:length(linkArray)) {
      if(linkArray[iData] == "theme.css")
        linkArray[iData] <- linkArray[iData]
      else
        linkArray[iData] <- paste(.RIGHT$libDir_RIGHT, linkArray[iData], sep="/")
    }
  }
  else
    linkArray <- paste("Javascript/", linkArray, sep="")
    
  return(paste0('<link rel="stylesheet" type="text/css" href="', linkArray, '"/>'))
  
} # createSource

## ---
## Create the head section with a title:
## ---

#' @importFrom shiny tag
createHead <- function(title) {

  # CHECK (junghoon): improve this later:
  temp <- as.character(shiny::tag("title", title))
  attributes(temp) <- NULL # remove all attributes
  title <- paste0("  ", temp)
  
  meta <- '  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>'
  
  if(.RIGHT$flagServer) {
    meta <- c(meta, '  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>')
  } # if
  
  # Links and sourced scripts:
  linkArray <- createLink(.RIGHT$linkArray)
  if (!is.null(linkArray)) {
    linkArray <- paste0("  ", linkArray)
  } # if
  
  sourceArray <- createSource(.RIGHT$sourceArray)
  
  if (!is.null(sourceArray)) {
    sourceArray <- paste0("  ", sourceArray)
  } # if
  
  return(c("<head>", "",
           meta, "",
           linkArray, if (!is.null(linkArray)) "" else NULL, 
           title, "",
           sourceArray, if (!is.null(sourceArray)) "" else NULL,
           "</head>"))
  
} # function createHead
