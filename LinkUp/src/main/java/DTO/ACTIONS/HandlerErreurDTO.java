package DTO.ACTIONS;

import java.time.LocalDateTime;
import java.util.HashMap;


public record HandlerErreurDTO(int httpCode, String message, LocalDateTime timestamp) { }
