package google.drive.domain;

import google.drive.domain.*;
import google.drive.infra.AbstractEvent;
import lombok.*;
import java.util.*;
@Data
@ToString
public class VideoProcessed extends AbstractEvent {

    private Long id;
    private String videoUrl;
    private Long fileId;
}


